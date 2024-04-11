import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, PaperProvider, Text } from "react-native-paper";
import NewPillForm from "./NewPillForm";
import Storage from "./Storage";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PillCard from "./UI Components/PillCard";
import { completePeriod } from "./Utils/CalculateMiddleDates";
import Notification from "./UI Components/Notification";

type pill = {
  name: string;
  id: number;
  hours: number;
  minutes: number;
  selectedStartingDay: string;
  selectedEndingDay: string;
  placeboDays: number;
  notificationId: string;
};

function Home() {
  const insets = useSafeAreaInsets();
  const [displayForm, setDisplayForm] = useState(false);
  const [displayCards, setDisplayCards] = useState(false);
  const [pillData, setPillData] = useState<pill>({
    name: "",
    id: 0,
    hours: 9,
    minutes: 0,
    selectedStartingDay: "",
    selectedEndingDay: "",
    placeboDays: 0,
    notificationId: "",
  });

  Storage.load({ key: "pill2" }).then((pillData) => setPillData(pillData));

  const middleDates = completePeriod(
    pillData.selectedStartingDay,
    pillData.selectedEndingDay,
    pillData.placeboDays
  );

  return (
    <View style={{ paddingTop: insets.top }}>
      <Text style={styles.header}>Pillsmate</Text>
      {displayForm ? (
        <NewPillForm onClose={() => setDisplayForm(false)}></NewPillForm>
      ) : (
        <View>
          <Button onPress={() => setDisplayForm(true)}>Add New Pill</Button>
          {pillData.name !== "" ? (
            <View>
              <PillCard
                onClose={() => setDisplayCards(false)}
                pillData={pillData}
                middleDates={middleDates}
              ></PillCard>
              <Notification pillData={pillData}></Notification>
            </View>
          ) : (
            <Text>"There are any pills configured"</Text>
          )}
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Home></Home>
      </SafeAreaProvider>
    </PaperProvider>
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
