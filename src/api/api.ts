// ссылки на API

interface Api {
  readonly API_SEARCH_AVIASALES: string;
  readonly API_SEARCH_TICKETS: string;
}

export const aviasalesApi: Api = {
  API_SEARCH_AVIASALES: "https://front-test.beta.aviasales.ru/search",
  API_SEARCH_TICKETS: "https://front-test.beta.aviasales.ru/tickets?searchId="
};
