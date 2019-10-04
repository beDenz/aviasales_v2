import React, { ReactElement } from "react";
import { Ifilters, IfiltersItem } from "../../App";
import "./filters.scss";

interface IProps {
  stopsFiltres: Ifilters;
  onClick: (e: React.MouseEvent) => void;
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
          <label htmlFor={item.id} type={item.id} onClick={props.onClick}>
            {item.titleForFilter}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Stopfiltres;
