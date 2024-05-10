import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { Card, IconButton, Text } from "react-native-paper";
import { usePillData } from "../context/PillDataContext";
import { completePeriod } from "../utils/CalculateMiddleDates";

type props = {
  onClose: () => void;
};

const pad = (num: number) => num.toString().padStart(2, "0");

export default function PillCard({ onClose }: props) {
  const pillData = usePillData();

  const middleDates = completePeriod(
    pillData.selectedStartingDay,
    pillData.selectedEndingDay,
    pillData.placeboDays
  );

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
            {`${pad(pillData.hours)}:${pad(pillData.minutes)} hs`}
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
