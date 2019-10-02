import { aviasalesApi } from "../api/api";

export function getObjectOfTickets(aviasalesApi: {
  API_SEARCH_AVIASALES: string;
  API_SEARCH_TICKETS: string;
}) {
  return fetch(aviasalesApi.API_SEARCH_AVIASALES)
    .then(responsive => responsive.json())
    .then(data => fetch(aviasalesApi.API_SEARCH_TICKETS + `${data.searchId}`))
    .then(data => {
      console.log(data.json());
    })
    .catch(() => console.log("error!"));

  /*
    .then(responsive => {
      console.log(responsive.status);
      return responsive.status === 200
        ? responsive.json().then(data => data)
        : false;
    }*/
  //);
}
