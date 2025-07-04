import type { Member } from "@/entities/member";

export interface ScheduleCalendar {
  id: number;
  title: string;
  participants: CalendarParticipant[];
}

export interface CalendarInfo {
  calendarId: number;
  title: string;
}

export interface CalendarParticipant extends Member {
  role: CalendarRole;
}

export type CalendarRole = "OWNER" | "VIEWER" | "EDITOR";
