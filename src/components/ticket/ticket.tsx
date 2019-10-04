import React, { ReactElement } from "react";
import "./ticket.scss";
import { ITicketPropsItem } from "../../App";

export interface ITicketProps {
  apiState: ITicketPropsItem[];
}

export const Ticket: React.FC<ITicketProps> = (props): ReactElement => {
  return (
    <div>
      {props.apiState
        .slice(0, 5)
        .map((item: ITicketPropsItem, index: number) => {
          return (
            <div key={index} className="ticket">
              <div className="ticket__header">
                <h3 className="ticket__price">{item.price}</h3>
                <div className="ticket__logo">
                  <img
                    src={`//pics.avs.io/99/36/${item.carrier}.png`}
                    alt="air logo"
                  />
                </div>
              </div>
              <div className="ticket__way">
                <div className="ticket__route">
                  <h4 className="ticket__title">MOW – HKT</h4>
                  <p className="ticket__descr">11:20 – 00:50</p>
                </div>
                <div className="ticket__lenght">
                  <h4 className="ticket__title">В пути</h4>
                  <p className="ticket__descr">21ч 15м</p>
                </div>
                <div className="ticket__stops">
                  <h4 className="ticket__title">2 пересадки</h4>
                  <p className="ticket__descr">HKG, JNB</p>
                </div>
              </div>
              <div className="ticket__way">
                <div className="ticket__route">
                  <h4 className="ticket__title">MOW – HKT</h4>
                  <p className="ticket__descr">11:20 – 00:50</p>
                </div>
                <div className="ticket__lenght">
                  <h4 className="ticket__title">В пути</h4>
                  <p className="ticket__descr">13ч 30м</p>
                </div>
                <div className="ticket__stops">
                  <h4 className="ticket__title">1 пересадка</h4>
                  <p className="ticket__descr">HKG</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
