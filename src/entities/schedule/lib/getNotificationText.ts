export const getNotificationText = (notificationTime?: string) => {
  switch (notificationTime) {
    case "ONE_DAY_BEFORE":
      return "1일 전";
    case "ONE_HOUR_BEFORE":
      return "1시간 전";
    case "THIRTY_MINUTES_BEFORE":
      return "30분 전";
    case "FIVE_MINUTES_BEFORE":
      return "5분 전";
    default:
      return "없음";
  }
};
