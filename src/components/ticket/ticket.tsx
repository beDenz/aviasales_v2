import React, { ReactElement } from "react";
import { ITicketPropsItem, Ifilters } from "../../App";
import Loader from "../loader/loader";
import "./ticket.scss";
import {
  getFormattedPrice,
  getFormattedDate,
  getTimeOfFlight
} from "../../service/utility";

export interface ITicketProps {
  apiState: ITicketPropsItem[] | undefined;
  tabsSort: string | null;
  filtres: Ifilters;
}

export const Ticket: React.FC<ITicketProps> = (props): ReactElement => {
  const sortTicketsByTabs = (
    incomingArray: ITicketPropsItem[],
    typeOfSort: string | null
  ): ITicketPropsItem[] => {
    /*
        функция сортировки по цене или быстроте
        По логике: в зависимости от типа сотрировки, соответсвующий элемент выноситься
        в отдельный массив, который сортируется стандартным методом JS sort() на увеличение,
        затем массив с билетам сопостовляется с полученный отсортированным массивом, высставляя элементы(билеты) соответсвенно 
        Вариант, возможно не самый оптимальный, слоность O не считал, просто захотелось попробовать.
    
        */
    let tempArray = [];
    let resultArray = new Array(incomingArray.length);

    switch (typeOfSort) {
      case "price":
        // TODO: Заменить циклы FOR на методы
        for (let i = 0; i < incomingArray.length; i++) {
          tempArray.push(incomingArray[i].price);
        }
        tempArray.sort((a, b) => a - b);

        for (let i = 0; i < incomingArray.length; i++) {
          resultArray[tempArray.indexOf(incomingArray[i].price)] =
            incomingArray[i];
        }
        return resultArray;
      case "fast":
        for (let i = 0; i < incomingArray.length; i++) {
          tempArray.push(
            incomingArray[i].segments[0].duration +
              incomingArray[i].segments[1].duration
          );
        }
        tempArray.sort((a, b) => a - b);
        for (let i = 0; i < incomingArray.length; i++) {
          resultArray[
            tempArray.indexOf(
              incomingArray[i].segments[0].duration +
                incomingArray[i].segments[1].duration
            )
          ] = incomingArray[i];
        }
        return resultArray;
      default:
        return incomingArray;
    }
  };
  /*
  const getFormattedPrice = (value: number) => {
    // Формат ценны
    return (
      <span>
        {value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")} P
      </span>
    );
  };
  
  const getFormattedDate = (departureDate: Date, duration: number) => {
    // Функция вывода время вылета и прилета
    let temp = new Date(departureDate);
    let arrivedDate = new Date(temp.getTime() + duration * 60000);
    return (
      <span>
        {temp.getHours() > 9 ? temp.getHours() : "0" + temp.getHours()}:
        {temp.getMinutes() > 9 ? temp.getMinutes() : "0" + temp.getMinutes()} -{" "}
        {arrivedDate.getHours() > 9
          ? arrivedDate.getHours()
          : "0" + arrivedDate.getHours()}
        :
        {arrivedDate.getMinutes() > 9
          ? arrivedDate.getMinutes()
          : "0" + arrivedDate.getMinutes()}
      </span>
    );
  };

  const getTimeOfFlight = (value: number) => {
    // Функция выводит форматированное время полета
    let hour: number = Math.trunc(value / 60);
    let minute: number = value - hour * 60;
    return (
      <span>
        {hour} ч {minute} м
      </span>
    );
  };
*/
  return (
    <div>
      {props.apiState === undefined ? (
        <Loader />
      ) : props.apiState.length !== 0 ? (
        sortTicketsByTabs(props.apiState, props.tabsSort)
          .slice(0, 5)
          .map((item: ITicketPropsItem, index: number) => {
            return (
              <div key={index} className="ticket">
                <div className="ticket__header">
                  <h3 className="ticket__price">
                    {getFormattedPrice(item.price)} P
                  </h3>
                  <div className="ticket__logo">
                    <img
                      src={`//pics.avs.io/99/36/${item.carrier}.png`}
                      alt="air logo"
                    />
                  </div>
                </div>
                <div className="ticket__way">
                  <div className="ticket__route">
                    <h4 className="ticket__title">
                      {item.segments[0].origin} - {item.segments[0].destination}
                    </h4>
                    <p className="ticket__descr">
                      {getFormattedDate(
                        item.segments[0].date,
                        item.segments[0].duration
                      )}
                    </p>
                  </div>
                  <div className="ticket__lenght">
                    <h4 className="ticket__title">В пути</h4>
                    <p className="ticket__descr">
                      {getTimeOfFlight(item.segments[0].duration)}
                    </p>
                  </div>
                  <div className="ticket__stops">
                    <h4 className="ticket__title">
                      {
                        props.filtres[item.segments[0].stops.length + 1]
                          .titleForTicket
                      }
                    </h4>
                    <p className="ticket__descr">
                      {item.segments[0].stops.length !== 0
                        ? item.segments[0].stops.toString()
                        : "Прямой"}
                    </p>
                  </div>
                </div>
                <div className="ticket__way">
                  <div className="ticket__route">
                    <h4 className="ticket__title">
                      {item.segments[1].destination} - {item.segments[1].origin}
                    </h4>
                    <p className="ticket__descr">
                      {getFormattedDate(
                        item.segments[1].date,
                        item.segments[1].duration
                      )}
                    </p>
                  </div>
                  <div className="ticket__lenght">
                    <h4 className="ticket__title">В пути</h4>
                    <p className="ticket__descr">
                      {getTimeOfFlight(item.segments[1].duration)}
                    </p>
                  </div>
                  <div className="ticket__stops">
                    <h4 className="ticket__title">
                      {
                        props.filtres[item.segments[1].stops.length + 1]
                          .titleForTicket
                      }
                    </h4>
                    <p className="ticket__descr">
                      {item.segments[1].stops.length !== 0
                        ? item.segments[1].stops.toString()
                        : "Прямой"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <div className="no-tickets">Билетов нет</div>
      )}
    </div>
  );
};
