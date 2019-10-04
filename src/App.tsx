import React, { useEffect, useState } from "react";
import { aviasalesApi } from "./api/api";
import { Ticket } from "./components/ticket/ticket";
import Logo from "./components/logo/logo";
import Stopfiltres from "./components/stopfiltres/stopfiltres";
import Tabs from "./components/tabs/tabs";
import "./App.scss";
import "./style.scss";

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
  titleForFilter: string;
  titleForTicket: string;
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
  const [apiState, setApiState] = useState<ITicketPropsItem[] | undefined>(
    undefined
  );
  const [requestApiError, setRequestApiError] = useState<boolean>(false);
  const [tabsSort, setTabsSort] = useState<string | null>("price");
  const [filtres, setFiltres] = useState<Ifilters>([
    {
      id: `all`,
      status: true,
      titleForFilter: `Все`,
      titleForTicket: `Пересадки`
    },
    {
      id: `noStops`,
      status: true,
      titleForFilter: `Без пересадок`,
      titleForTicket: `Пересадки`
    },
    {
      id: `oneStops`,
      status: true,
      titleForFilter: `1 пересадка`,
      titleForTicket: `1 пересадка`
    },
    {
      id: `twoStops`,
      status: true,
      titleForFilter: `2 Пересадки`,
      titleForTicket: `2 Пересадки`
    },
    {
      id: `threeStops`,
      status: true,
      titleForFilter: `3 пересадки`,
      titleForTicket: `3 пересадки`
    }
    // { id: `all`, status: true, title: `Пересадки` }
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
          .catch(err => console.log(err))
      );
  }, [requestApiError]);

  /*
  if (apiState !== undefined) {
    console.log(apiState);
    console.log(filtres);
  }
  */

  const changeTabsSort = (e: React.MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("active")) {
      setTabsSort(target.getAttribute("type"));
    }
  };

  const onClickStops = (e: React.MouseEvent): void => {
    // обработчик нажатия на фильтры выбора количества остановок
    const target = e.target as HTMLElement;
    const chosenOption = target.getAttribute("type");
    setFiltres(
      filtres.map(item =>
        item.id === chosenOption ? { ...item, status: !item.status } : item
      )
    );
  };

  const filterByStops = (
    incomingArray: ITicketPropsItem[] | undefined,
    filtres: Ifilters
  ): ITicketPropsItem[] | undefined => {
    if (incomingArray === undefined) return undefined;
    if (filtres[0].id === `all` && filtres[0].status) return incomingArray;

    const stopOptions: boolean[] = filtres.slice(1, 5).map(item => item.status);

    return incomingArray.filter(item =>
      item.segments.every(segment => stopOptions[segment.stops.length])
    );
  };

  return (
    <div>
      <div className="main">
        <Logo />
        <div className="main__inner">
          <Stopfiltres onClick={onClickStops} stopsFiltres={filtres} />
          <div className="result">
            <Tabs onClick={changeTabsSort} tabsSort={tabsSort} />
            <Ticket
              tabsSort={tabsSort}
              filtres={filtres}
              apiState={filterByStops(apiState, filtres)}
              // apiState !== undefined ? filterByStops(apiState, filtres) : []
              //}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
