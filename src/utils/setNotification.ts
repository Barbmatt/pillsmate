import * as Notifications from "expo-notifications";
import {
  completePeriod,
  markedDatesToArray,
} from "../utils/CalculateMiddleDates";
import { PillData } from "../context/PillDataContext";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// }); //no entiendo cuando se usa esto.

export const schedulePushNotification = async (pillData: PillData) => {
  const marked = completePeriod(
    pillData.selectedStartingDay,
    pillData.selectedEndingDay,
    pillData.placeboDays
  );

  const days = markedDatesToArray(marked);

  Notifications.cancelAllScheduledNotificationsAsync(); //esto por que aca?

  const promises = days.map((day) => {
    const date = day;

    date.setHours(pillData.hours);
    date.setMinutes(pillData.minutes);

    return Notifications.scheduleNotificationAsync({
      content: {
        title: "Pill time!" + pillData.name,
        body: "Hora de tomar la pastilla",
        data: { data: "goes here" },
        sticky: true,
        autoDismiss: false,
      },
      trigger: date,
    });
  });

  const ids = await Promise.all(promises);

  const notifications = days.map((day, index) => {
    const date = day;

    date.setHours(pillData.hours);
    date.setMinutes(pillData.minutes);

    return {
      date: {
        year: date.getFullYear(),
        month: date.getMonth(), //va entre 0 y 11
        day: date.getDay(),
      },
      id: ids[index],
    };
  });

  return notifications;
};
