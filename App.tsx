import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, PaperProvider, Text } from "react-native-paper";
import PillCalendar from "./UI Components/Calendar";
import PlaceboDays from "./UI Components/PlaceboDays";
import Time from "./UI Components/Time";

export default function App() {
  const [showTime, setShowTime] = useState(false);

  return (
    <PaperProvider>
      <Text style={styles.header}>Pillsmate</Text>
      <View style={styles.container}>
        <Text variant="bodyLarge">Mark the period for the next blister:</Text>
        <PillCalendar></PillCalendar>
        <PlaceboDays></PlaceboDays>
        <Button onPress={() => setShowTime(true)}>Set Time</Button>
        <Button onPress={() => console.log("pn")}>Save Pill Calendar</Button>
        {showTime ? (
          <Time
            onDismiss={() => setShowTime(false)}
            onConfirm={() => setShowTime(false)}
          ></Time>
        ) : null}
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    backgroundColor: "#f898b0",
    marginTop: 45,
    fontSize: 35,
    maxHeight: 60,
  },
});
