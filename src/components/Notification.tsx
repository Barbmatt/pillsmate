import * as Notifications from "expo-notifications";
import { View } from "react-native";
import { Button } from "react-native-paper";
import {
  PillData,
  usePillData,
  usePillDataDispatch,
} from "../context/PillDataContext";
import { useEffect } from "react";
import {
  completePeriod,
  markedDatesToArray,
} from "../utils/CalculateMiddleDates";

var id = "";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface DailyNotificationTrigger {
  type: "daily";
  hour: 11;
  minute: 30;
}

async function schedulePushNotification(pillData: PillData) {
  const marked = completePeriod(
    pillData.selectedStartingDay,
    pillData.selectedEndingDay,
    pillData.placeboDays
  );

  const days = markedDatesToArray(marked);

  await Notifications.cancelAllScheduledNotificationsAsync();

  days.map(async (day) => {
    const date = day;

    date.setHours(pillData.hours);
    date.setMinutes(pillData.minutes);

    return await Notifications.scheduleNotificationAsync({
      content: {
        title: "Pill time!" + pillData.name,
        body: "Hora de tomar la pastilla",
        data: { data: "goes here" },
        // sticky: true,
        sticky: false,
        autoDismiss: false,
      },
      trigger: date,
    });
  });
}

async function cancelNotifications(id: string) {
  await Notifications.cancelScheduledNotificationAsync(id);
}

export default function Notification() {
  const pillData = usePillData();
  const dispatch = usePillDataDispatch();

  useEffect(() => {
    (async () => await schedulePushNotification(pillData))(); //use effect
  }, [pillData.hours, pillData.minutes]); //se ejecuta cada vez que abro la app y cuando cambia hour y minutes de pillData
  //ver warning de la app
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
