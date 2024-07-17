import { useState } from "react";
import { View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import PlaceboDays from "./PlaceboDays";

type propstype = {
  setStartDay: (p: string) => void;
  setEndDay: (p: string) => void;
  selectedStartDay: string;
  selectedEndDay: string;
  completePeriod: () => MarkedDates;
  placeboDays: number;
};

export default function PillCalendar({
  setStartDay,
  setEndDay,
  selectedStartDay,
  selectedEndDay,
  completePeriod,
  placeboDays,
}: propstype) {
  const [modifyStartDate, setModifyStartDate] = useState<boolean>(true);

  const setPeriod = (selectedDay: DateData) => {
    if (modifyStartDate) {
      setStartDay(selectedDay.dateString);
      setEndDay("");
      setModifyStartDate(false);
    } else {
      if (selectedStartDay >= selectedDay.dateString) {
        setEndDay(selectedStartDay);
        setStartDay(selectedDay.dateString);
      } else setEndDay(selectedDay.dateString);
      setModifyStartDate(true);
    }
  };

  const middleDates: MarkedDates =
    selectedEndDay !== "" ? completePeriod() : {};

  return (
    <View>
      <Calendar
        markingType={"period"}
        onDayPress={(selectedDay) => setPeriod(selectedDay)}
        markedDates={{
          [selectedStartDay]: { startingDay: true, color: "lightblue" },
          ...middleDates,
          [selectedEndDay]: {
            endingDay: true,
            color: placeboDays !== 0 ? "pink" : "lightblue",
          },
          [new Date().toISOString().substring(0, 10)]: { color: "salmon" },
        }}
      ></Calendar>
    </View>
  );
}
