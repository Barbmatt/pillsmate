import * as Notifications from "expo-notifications";
import { Button } from "react-native-paper";
import {
  Notification,
  PillDataAction,
  usePillData,
  usePillDataDispatch,
} from "../context/PillDataContext";

async function cancelNotifications(
  notifications: Notification[],
  date: Date,
  dispatch: React.Dispatch<PillDataAction>
) {
  const notificationsToCancel = notifications.filter((notification) => {
    return new Date(notification.date) <= date;
  }); //filtra las notificaciones que cumplen con la condicion del return.

  // notificationsToCancel.forEach(async (element) => {
  //   await Notifications.cancelScheduledNotificationAsync(element.id);
  // });

  await Notifications.dismissAllNotificationsAsync();

  dispatch({ type: "cancelNotifications", payload: notificationsToCancel });

  return notificationsToCancel; //porque tiene que retornar esto?
}

export default function PillTakenButton() {
  const dispatch = usePillDataDispatch();
  const pillData = usePillData();

  return (
    <Button
      onPress={async () =>
        await cancelNotifications(pillData.notifications, new Date(), dispatch)
      }
    >
      Pill Taken
    </Button> //este boton deberia aparecer cuando se hace la hora de la pastilla.
  );
}
