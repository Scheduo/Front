export interface ScheduleRequest {
  title: string;
  isAllDay: boolean;
  startDate: string; // yyyy-mm-dd
  endDate: string;
  startTime: string; // hh:mm
  endTime: string;
  location: string;
  category: string;
  memo: string;
  notificationTime: NotificationTime;
  recurrence: {
    recurrenceRule: RecurrenceRule;
    recurrenceEndDate: string;
  } | null;
}

export type NotificationTime =
  | "NONE"
  | "ONE_DAY_BEFORE"
  | "ONE_HOUR_BEFORE"
  | "THIRTY_MINUTES_BEFORE"
  | "FIVE_MINUTES_BEFORE";

export type RecurrenceRule = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

export interface ScheduleFormData {
  title: string;
  isAllDay: boolean;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  category: string;
  memo: string;
  hasNotification: boolean;
  notificationTime: NotificationTime;
  hasRecurrence: boolean;
  recurrenceRule: RecurrenceRule;
  recurrenceEndDate: string;
}
