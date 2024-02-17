import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

export default function App() {
  const [selectedStartingDay, setSelectedStartingDay] = useState<string>("");
  const [selectedEndingDay, setSelectedEndingDay] = useState<string>("");

  const setPeriod = (selectedDay: DateData) => {
    if (selectedStartingDay === "")
      setSelectedStartingDay(selectedDay.dateString);
    else setSelectedEndingDay(selectedDay.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pillsmate</Text>
      <Text>Mark the Start Date and End Date of your blister:</Text>
      <Calendar
        markingType={"period"}
        onDayPress={(selectedDay) => setPeriod(selectedDay)}
        markedDates={{
          [selectedStartingDay]: { startingDay: true, color: "lightblue" },
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
