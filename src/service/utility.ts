export const getFormattedPrice = (value: number) => {
  // Формат ценны
  return value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
};
export const getFormattedDate = (departureDate: Date, duration: number) => {
  // Функция вывода время вылета и прилета
  let temp = new Date(departureDate);
  let arrivedDate = new Date(temp.getTime() + duration * 60000);
  return `${temp.getHours() > 9 ? temp.getHours() : "0" + temp.getHours()}:${
    temp.getMinutes() > 9 ? temp.getMinutes() : "0" + temp.getMinutes()
  } - 
      ${
        arrivedDate.getHours() > 9
          ? arrivedDate.getHours()
          : "0" + arrivedDate.getHours()
      }:${
    arrivedDate.getMinutes() > 9
      ? arrivedDate.getMinutes()
      : "0" + arrivedDate.getMinutes()
  }`;
};
export const getTimeOfFlight = (value: number) => {
  // Функция выводит форматированное время полета
  let hour: number = Math.trunc(value / 60);
  let minute: number = value - hour * 60;
  return `${hour} ч ${minute} м`;
};
