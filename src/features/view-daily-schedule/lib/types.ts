import type { ScheduleCalendar } from "@/entities/calendar";
import type { Schedule } from "@/entities/schedule";

export type ScheduleItem = Pick<Schedule, "id" | "title" | "location" | "startTime" | "endTime" | "isAllDay"> & {
  calendar: ScheduleCalendar;
};
