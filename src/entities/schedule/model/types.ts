import type { ScheduleCalendar } from "@/entities/calendar";

export interface Schedule {
  id: number;
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
  recurrence: ScheduleRecurrence | null;
  calendar: ScheduleCalendar;
}

export interface ScheduleRecurrence {
  recurrenceRule: RecurrenceRule;
  recurrenceEndDate: string; // yyyy-mm-dd
}

export type NotificationTime =
  | "NONE"
  | "ONE_DAY_BEFORE"
  | "ONE_HOUR_BEFORE"
  | "THIRTY_MINUTES_BEFORE"
  | "FIVE_MINUTES_BEFORE";

export type RecurrenceRule = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
