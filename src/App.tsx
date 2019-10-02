import React, { useEffect, useState } from "react";
import { aviasalesApi } from "./api/api";
import "./App.scss";

const App: React.FC = () => {
  const [apiState, setApiState] = useState<any>(undefined); // Какой тип возвращаемого значение promise?
  const [requestApiError, setRequestApiError] = useState<boolean>(false);

  useEffect((): void => {
    fetch(aviasalesApi.API_SEARCH_AVIASALES)
      .then(responsive => responsive.json())
      .then(responsive =>
        fetch(aviasalesApi.API_SEARCH_TICKETS + `${responsive.searchId}`)
          .then(data =>
            data.status === 200 ? data.json() : setRequestApiError(true)
          )
          .then(data => setApiState(data))
      );
  }, [requestApiError]);

  if (apiState !== undefined) {
    console.log(apiState);
  }

  return <div>Hello</div>;
};

export default App;
