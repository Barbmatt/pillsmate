import { useState } from "react";
import { View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

export default function PillCalendar() {
  const [selectedStartingDay, setSelectedStartingDay] = useState<string>("");
  const [selectedEndingDay, setSelectedEndingDay] = useState<string>("");
  const [modifyStartDate, setModifyStartDate] = useState<boolean>(true);

  const setPeriod = (selectedDay: DateData) => {
    if (modifyStartDate) {
      setSelectedStartingDay(selectedDay.dateString);
      setSelectedEndingDay("");
      setModifyStartDate(false);
    } else {
      if (selectedStartingDay >= selectedDay.dateString) {
        setSelectedEndingDay(selectedStartingDay);
        setSelectedStartingDay(selectedDay.dateString);
      } else setSelectedEndingDay(selectedDay.dateString);
      setModifyStartDate(true);
    }
  };

  const completePeriod = (): MarkedDates => {
    const middleDates: MarkedDates = {};
    let date = new Date(new Date(selectedStartingDay).getTime() + 86400000);
    let endDate = new Date(selectedEndingDay);
    while (date < endDate) {
      middleDates[date.toISOString().substring(0, 10)] = {
        color: "lightblue",
      };
      date = new Date(date.getTime() + 86400000);
    }
    return middleDates;
  };

  const middleDates: MarkedDates =
    selectedEndingDay !== "" ? completePeriod() : {};
  return (
    <Calendar
      markingType={"period"}
      onDayPress={(selectedDay) => setPeriod(selectedDay)}
      markedDates={{
        [selectedStartingDay]: { startingDay: true, color: "lightblue" },
        ...middleDates,
        [selectedEndingDay]: { endingDay: true, color: "lightblue" },
      }}
    ></Calendar>
  );
}
