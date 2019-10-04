import React, { ReactElement, useCallback } from "react";
import { IstopsFilters } from "../../App";
import { Ifilters, IfiltersItem } from "../../App";
import "./filters.scss";

interface IProps {
  stopsFiltres: Ifilters;
}

const Stopfiltres: React.FC<IProps> = (props): ReactElement => {
  return (
    <div className="filters">
      <h3 className="filters__title">Количество пересадок</h3>
      {props.stopsFiltres.map((item: IfiltersItem, index: number) => (
        <div key={index} className="filters__item">
          <input
            type="checkbox"
            name={item.id}
            id={item.id}
            defaultChecked={item.status}
            hidden
          />
          <label htmlFor={item.id}>{item.title}</label>
        </div>
      ))}
    </div>
  );
};

export default Stopfiltres;

/*

{props.stopsFiltres.map(
        (
          item: { id: string; status: boolean; title: string },
          index: number
        ) => (
          <div className="filters__item">
            <input type="checkbox" name="all" id="all" hidden />>
            <label htmlFor="all">Все</label>
          </div>
        )
      )}
      */
