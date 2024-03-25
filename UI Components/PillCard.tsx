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

type pill = {
  name: string;
  id: number;
  hours: number;
  minutes: number;
  selectedStartingDay: string;
  selectedEndingDay: string;
};

type props = {
  onClose: () => void;
  pillData: pill;
};

export default function PillCard({ onClose, pillData }: props) {
  return (
    <View>
      <Card>
        <IconButton
          icon="close"
          size={20}
          onPress={() => onClose()}
        ></IconButton>
        <Card.Content>
          <Text variant="titleLarge">{pillData.name}</Text>
          <Text variant="bodyMedium">
            {pillData.hours.toString().padStart(2, "0") +
              ":" +
              pillData.minutes.toString().padStart(2, "0") +
              " hs"}
          </Text>
          <Calendar
            markingType="period"
            markedDates={{
              [pillData.selectedStartingDay]: {
                startingDay: true,
                color: "lightblue",
              },

              [pillData.selectedEndingDay]: {
                endingDay: true,
                color: "lightblue",
              },
            }}
          ></Calendar>
        </Card.Content>
      </Card>
    </View>
  );
}
