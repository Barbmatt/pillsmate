import { View } from "react-native";
import { TimePickerModal } from "react-native-paper-dates";

type props = {
  onDismiss: () => void;
  onConfirm: () => void;
};

export default function Time(props: props) {
  const saveTimeData = () => {
    //guardar los datos de la hora
    props.onConfirm();
  };
  return (
    <View>
      <TimePickerModal
        locale="us"
        visible
        onDismiss={props.onDismiss}
        onConfirm={saveTimeData}
        use24HourClock
      ></TimePickerModal>
    </View>
  );
}
