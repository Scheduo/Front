import type { NotificationTime, RecurrenceRule } from "../lib";

export const NOTIFICATION_OPTIONS = [
  { label: "5분 전", value: "FIVE_MINUTES_BEFORE" as NotificationTime },
  { label: "30분 전", value: "THIRTY_MINUTES_BEFORE" as NotificationTime },
  { label: "1시간 전", value: "ONE_HOUR_BEFORE" as NotificationTime },
  { label: "1일 전", value: "ONE_DAY_BEFORE" as NotificationTime },
];

export const RECURRENCE_OPTIONS = [
  { label: "매일", value: "DAILY" as RecurrenceRule },
  { label: "매주", value: "WEEKLY" as RecurrenceRule },
  { label: "매월", value: "MONTHLY" as RecurrenceRule },
  { label: "매년", value: "YEARLY" as RecurrenceRule },
];
