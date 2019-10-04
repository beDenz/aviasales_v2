import React, { useEffect, useState, useCallback } from "react";
import { aviasalesApi } from "./api/api";
import "./App.scss";
import "./style.scss";
import Logo from "./components/logo/logo";
import Stopfiltres from "./components/stopfiltres/stopfiltres";
import Tabs from "./components/tabs/tabs";
import { Ticket } from "./components/ticket/ticket";

// Interface
export interface IstopsFilters {
  all: boolean;
  noStops: boolean;
  oneStops: boolean;
  twoStops: boolean;
  threeStops: boolean;
}

export interface IfiltersItem {
  id: string;
  status: boolean;
  title: string;
}

export interface Ifilters extends Array<IfiltersItem> {
  [index: number]: IfiltersItem;
}

export interface IEvenHandler {
  onClick: (e: React.MouseEvent) => void;
}

export interface ITicketPropsItem {
  price: number;
  carrier: string;
  segments: {
    date: Date;
    destination: string;
    duration: number;
    origin: string;
    stops: [string?, string?, string?];
  }[];
}
// End Interface

const App: React.FC = () => {
  const [apiState, setApiState] = useState<any>(undefined);
  const [requestApiError, setRequestApiError] = useState<boolean>(false);
  const [tabsSort, setTabsSort] = useState<string | null>("price");
  const [filtres, setFiltres] = useState<Ifilters>([
    { id: `all`, status: true, title: `Без пересадок` },
    { id: `noStops`, status: true, title: `Без пересадок` },
    { id: `oneStops`, status: true, title: `Одна пересадка` },
    { id: `twoStops`, status: true, title: `Две Пересадки` },
    { id: `threeStops`, status: true, title: `Три пересадки` }
  ]);

  useEffect((): void => {
    fetch(aviasalesApi.API_SEARCH_AVIASALES)
      .then(responsive => responsive.json())
      .then(responsive =>
        fetch(aviasalesApi.API_SEARCH_TICKETS + `${responsive.searchId}`)
          .then(data =>
            data.status === 200 ? data.json() : setRequestApiError(true)
          )
          .then(data => setApiState(data.tickets))
      );
  }, [requestApiError]);

  if (apiState !== undefined) {
    // console.log(apiState);
  }

  const changeTabsSort = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("active")) {
      setTabsSort(target.getAttribute("type"));
    }
  };

  return (
    <div>
      <div className="main">
        <Logo />
        <div className="main__inner">
          <Stopfiltres stopsFiltres={filtres} />
          <div className="result">
            <Tabs onClick={changeTabsSort} tabsSort={tabsSort} />
            <Ticket apiState={apiState !== undefined ? apiState : []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
