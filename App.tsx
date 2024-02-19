import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

export default function App() {
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
      middleDates[date.toISOString().substring(0, 10)] = { color: "lightblue" };
      date = new Date(date.getTime() + 86400000);
    }
    return middleDates;
  };

  const middleDates: MarkedDates =
    selectedEndingDay !== "" ? completePeriod() : {};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pillsmate</Text>
      <Text>Mark the period for the next blister:</Text>
      <Calendar
        markingType={"period"}
        onDayPress={(selectedDay) => setPeriod(selectedDay)}
        markedDates={{
          [selectedStartingDay]: { startingDay: true, color: "lightblue" },
          ...middleDates,
          [selectedEndingDay]: { endingDay: true, color: "lightblue" },
        }}
      ></Calendar>
      <Button title="Add new pill"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    backgroundColor: "violet",
    marginTop: 35,
    fontSize: 35,
    maxHeight: 60,
  },
});
