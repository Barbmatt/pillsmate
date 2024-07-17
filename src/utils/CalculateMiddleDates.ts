import { MarkedDates } from "react-native-calendars/src/types";
import { DateData } from "react-native-calendars";
import { usePillDataDispatch } from "../context/PillDataContext";

// TODO: dates in between
export const completePeriod = (
  selectedStartingDay: string,
  selectedEndingDay: string,
  placeboDays: number
): MarkedDates => {
  const middleDates: MarkedDates = {};
  let date = new Date(new Date(selectedStartingDay).getTime());
  let endActiveDate = new Date(
    new Date(selectedEndingDay).getTime() - (placeboDays - 1) * 86400000
  );
  while (date < endActiveDate) {
    middleDates[date.toISOString().substring(0, 10)] = {
      color: "lightblue",
    };
    date = new Date(date.getTime() + 86400000);
  }

  let endPeriodDate = new Date(selectedEndingDay);
  while (date < endPeriodDate) {
    middleDates[date.toISOString().substring(0, 10)] = {
      color: "pink",
    };
    date = new Date(date.getTime() + 86400000);
  }
  return middleDates;
};

export const allDates = (
  selectedStartingDay: string,
  selectedEndingDay: string,
  placeboDays: number
): MarkedDates => {
  const marked = completePeriod(
    selectedStartingDay,
    selectedEndingDay,
    placeboDays
  );
  return {
    [selectedStartingDay]: {},
    ...marked,
    [selectedEndingDay]: {},
  };
};

export const markedDatesToArray = (marked: MarkedDates) => {
  return Object.keys(marked).map((m) => new Date(m));
};
