import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import Storage from "../Storage";

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

type props = {
  pillData: pill;
};

var id = "";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function schedulePushNotification(trigger: Date, pillData: pill) {
  id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Pill time!" + pillData.name,
      body: "Hora de tomar la pastilla.",
      data: { data: "goes here" },
      sticky: true,
      autoDismiss: false,
    },
    trigger: {
      hour: trigger.getHours(),
      minute: trigger.getMinutes(),
      repeats: true,
    },
  });
  pillData.notificationId = id;
  Storage.save({ key: "pill2", data: pillData });
}

async function cancelNotifications(id: string) {
  await Notifications.cancelScheduledNotificationAsync(id);
}

export default function Notification({ pillData }: props) {
  useEffect(() => {
    const trigger = new Date();
    trigger.setHours(pillData.hours);
    trigger.setMinutes(pillData.minutes);
    trigger.setSeconds(0);

    (async () => await schedulePushNotification(trigger, pillData))(); //use effect
  }, [pillData.hours, pillData.minutes]); //se ejecuta cada vez que abro la app y cuando cambia hour y minutes de pillData

  const days = [pillData.selectedStartingDay, pillData.selectedEndingDay];

  return (
    <View>
      <Button
        onPress={async () => await cancelNotifications(pillData.notificationId)}
      >
        Pill Taken
      </Button>
    </View>
  );
}
