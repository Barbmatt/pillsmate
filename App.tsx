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

type pill = {
  name: string;
  id: number;
  hours: number;
  minutes: number;
  selectedStartingDay: string;
  selectedEndingDay: string;
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
  });

  const displayPillCards = () => {
    Storage.load({ key: "pill2" }).then((pillData) => setPillData(pillData));
    setDisplayCards(true);
  };

  return (
    <View style={{ paddingTop: insets.top }}>
      <Text style={styles.header}>Pillsmate</Text>
      {displayForm ? (
        <NewPillForm onClose={() => setDisplayForm(false)}></NewPillForm>
      ) : (
        <View>
          <Button onPress={() => setDisplayForm(true)}>Add New Pill</Button>
          <Button onPress={displayPillCards}>Get Pill</Button>
          {displayCards ? (
            <PillCard
              onClose={() => setDisplayCards(false)}
              pillData={pillData}
            ></PillCard>
          ) : null}
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
