import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PillCard from "../components/PillCard";
import PillTakenButton from "../components/PillTakenButton";
import { usePillData, usePillDataDispatch } from "../context/PillDataContext";
import NewPillForm from "./NewPillForm";
import { es, registerTranslation } from "react-native-paper-dates";

registerTranslation("es", es);

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
              <PillTakenButton />
            </View>
          ) : (
            <Text>"There are no pills configured"</Text>
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
    backgroundColor: "#ded7d9",
    fontSize: 35,
    maxHeight: 60,
  },
});
