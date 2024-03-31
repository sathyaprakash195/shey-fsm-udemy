import dayjs from "dayjs";

export const getDateTimeFormat = (date: string) => {
  return dayjs(date).format("DD MMM YYYY, hh:mm A");
};

export const getDateFormat = (date: string) => {
  return dayjs(date).format("DD MMM YYYY");
};
