import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, IconButton, PaperProvider, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PillCalendar from "./UI Components/Calendar";
import PlaceboDays from "./UI Components/PlaceboDays";
import Time from "./UI Components/Time";
import Storage from "./Storage";
import { completePeriod } from "./Utils/CalculateMiddleDates";

type props = {
  onClose: () => void;
};

export default function NewPillForm(props: props) {
  const [selectedStartingDay, setSelectedStartingDay] = useState<string>("");
  const [selectedEndingDay, setSelectedEndingDay] = useState<string>("");
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [placeboDays, setPlaceboDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const pill = {
    name: "Jade MD 24",
    id: 7,
    hours,
    minutes,
    selectedStartingDay,
    selectedEndingDay,
  };

  const SavePillCalendar = () => {
    console.log("hours" + hours);
    Storage.save({ key: "pill2", data: pill });
    Storage.load({ key: "pill2" }).then((pillData) =>
      console.log("hafgda" + pillData.hour)
    );
    props.onClose();
  };

  const setSelectedTime = () => {
    setShowTimeModal(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">Mark the period for the next blister:</Text>
      <PillCalendar
        selectedStartDay={selectedStartingDay}
        selectedEndDay={selectedEndingDay}
        setStartDay={(p) => setSelectedStartingDay(p)}
        setEndDay={(p) => setSelectedEndingDay(p)}
        completePeriod={() =>
          completePeriod(selectedStartingDay, selectedEndingDay, placeboDays)
        }
        placeboDays={placeboDays}
      ></PillCalendar>
      <PlaceboDays
        setPlaceboDays={(p) => setPlaceboDays(p)}
        placeboDays={placeboDays}
      ></PlaceboDays>
      <Button icon="clock" onPress={() => setShowTimeModal(true)}>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")} hs
      </Button>
      {showTimeModal ? (
        <Time
          onDismiss={() => setShowTimeModal(false)}
          onConfirm={setSelectedTime}
          setHours={setHours}
          setMinutes={setMinutes}
        ></Time>
      ) : null}
      <Button
        onPress={SavePillCalendar}
        disabled={selectedEndingDay !== "" ? false : true}
      >
        Save Pill Calendar
      </Button>
      <Button onPress={props.onClose}>Close</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f898b0",
    fontSize: 35,
    maxHeight: 60,
  },
});