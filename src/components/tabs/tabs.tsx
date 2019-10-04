import React, { ReactElement } from "react";
import "./tabs.scss";

declare module "react" {
  interface HTMLAttributes<T> {
    type?: string;
    //element?: string;
    //modifiers?: string;
  }
}

interface ITabsProps extends React.HTMLAttributes<HTMLElement> {
  onClick: (e: React.MouseEvent) => void;
  tabsSort: string | null;
}

const Tabs: React.FC<ITabsProps> = (props): ReactElement => {
  return (
    <div className="tabs">
      <div
        className={
          props.tabsSort === "price" ? "tabs__item active" : "tabs__item"
        }
        onClick={props.onClick}
        type="price"
      >
        Самый дешевый
      </div>
      <div
        className={
          props.tabsSort === "fast" ? "tabs__item active" : "tabs__item"
        }
        onClick={props.onClick}
        type="fast"
      >
        Самый быстрый
      </div>
    </div>
  );
};

export default Tabs;
