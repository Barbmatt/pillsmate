import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Notification from "../components/Notification";
import PillCard from "../components/PillCard";
import { usePillData, usePillDataDispatch } from "../context/PillDataContext";
import { completePeriod } from "../utils/CalculateMiddleDates";
import Storage from "../../Storage";
import NewPillForm from "./NewPillForm";

export function Home() {
  const insets = useSafeAreaInsets();
  const [displayForm, setDisplayForm] = useState(false);
  const [displayCards, setDisplayCards] = useState(false);
  const pillData = usePillData();
  const dispatch = usePillDataDispatch();

  return (
    <View style={{ paddingTop: insets.top }}>
      <Text style={styles.header}>Pillsmate</Text>
      {displayForm ? (
        <NewPillForm onClose={() => setDisplayForm(false)} />
      ) : (
        <View>
          <Button onPress={() => setDisplayForm(true)}>Edit Pill</Button>
          {pillData.name !== "" ? (
            <View>
              <PillCard onClose={() => setDisplayCards(false)} />
              <Notification />
            </View>
          ) : (
            <Text>"There are any pills configured"</Text>
          )}
        </View>
      )}
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
