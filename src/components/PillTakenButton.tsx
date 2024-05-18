import * as Notifications from "expo-notifications";
import { Button } from "react-native-paper";
import {
  Notification,
  PillData,
  usePillData,
  usePillDataDispatch,
} from "../context/PillDataContext";
import { useEffect } from "react";

var id = "";

async function cancelNotifications(notifications: Notification[], date: Date) {
  const dispatch = usePillDataDispatch();

  const notificationsToCancel = notifications.filter((notification) => {
    return (
      new Date(
        notification.date.day,
        notification.date.month,
        notification.date.year
      ) <= date
    );
  }); //filtra las notificaciones que cumplen con la condicion del return.

  notificationsToCancel.forEach((element) => {
    Notifications.cancelScheduledNotificationAsync(element.id);
  });

  dispatch({ type: "cancelNotifications", payload: notificationsToCancel });

  return notificationsToCancel; //porque tiene que retornar esto?
}

export default function PillTakenButton() {
  const pillData = usePillData();

  return (
    <Button
      onPress={async () =>
        await cancelNotifications(pillData.notifications, new Date())
      }
    >
      Pill Taken
    </Button> //este boton deberia aparecer cuando se hace la hora de la pastilla.
  );
}
