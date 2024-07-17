import { useState } from "react";
import { View } from "react-native";
import { TimePickerModal } from "react-native-paper-dates";

type props = {
  onDismiss: () => void;
  onConfirm: () => void;
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
};

type time = {
  hours: number;
  minutes: number;
};

export default function Time(props: props) {
  const saveTimeData = ({ hours, minutes }: time) => {
    props.setHours(hours);
    props.setMinutes(minutes);
    props.onConfirm();
  };

  return (
    <View>
      <TimePickerModal
        locale="es"
        visible
        onDismiss={props.onDismiss}
        onConfirm={({ hours, minutes }) => saveTimeData({ hours, minutes })}
        hours={new Date().getHours()}
        minutes={new Date().getMinutes()}
        use24HourClock
      ></TimePickerModal>
    </View>
  );
}
