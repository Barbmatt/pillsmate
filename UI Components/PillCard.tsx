import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  Button,
  PaperProvider,
  Text,
  Card,
  IconButton,
} from "react-native-paper";
import Storage from "../Storage";
import { MarkedDates } from "react-native-calendars/src/types";

type pill = {
  name: string;
  id: number;
  hours: number;
  minutes: number;
  selectedStartingDay: string;
  selectedEndingDay: string;
  placeboDays: number;
};

type props = {
  onClose: () => void;
  pillData: pill;
  middleDates: MarkedDates;
};

export default function PillCard({ onClose, pillData, middleDates }: props) {
  return (
    <View>
      <Card>
        <IconButton
          icon="close"
          size={20}
          onPress={() => onClose()}
        ></IconButton>
        <Card.Content style={style.cardheader}>
          <Text variant="titleLarge">{pillData.name}</Text>
          <Text style={style.hour}>
            {pillData.hours.toString().padStart(2, "0") +
              ":" +
              pillData.minutes.toString().padStart(2, "0") +
              " hs"}
          </Text>
        </Card.Content>
        <Card.Content>
          <Calendar
            markingType="period"
            markedDates={{
              [pillData.selectedStartingDay]: {
                startingDay: true,
                color: "lightblue",
              },
              ...middleDates,
              [pillData.selectedEndingDay]: {
                endingDay: true,
                color: pillData.placeboDays !== 0 ? "pink" : "lightblue",
              },
            }}
          ></Calendar>
        </Card.Content>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  cardheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hour: {
    fontSize: 18,
  },
});
