import * as Notifications from "expo-notifications";
import {
  allDates,
  completePeriod,
  markedDatesToArray,
} from "../utils/CalculateMiddleDates";
import { PillData } from "../context/PillDataContext";

export const schedulePushNotification = async (pillData: PillData) => {
  const marked = allDates(
    pillData.selectedStartingDay,
    pillData.selectedEndingDay,
    pillData.placeboDays
  );

  const days = markedDatesToArray(marked);

  Notifications.cancelAllScheduledNotificationsAsync();

  const promises = days.map((day) => {
    const date = new Date(
      `${day.toISOString().substring(0, 10)} ${pillData.hours}:${
        pillData.minutes
      }`
    );

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
    const date = new Date(
      `${day.toISOString().substring(0, 10)} ${pillData.hours}:${
        pillData.minutes
      }`
    );

    return {
      date: date.getTime(),
      id: ids[index],
    };
  });

  return notifications;
};
