import type { Member } from "@/entities/member";

export interface ScheduleCalendar {
  id: number;
  name: string;
  participants: CalendarParticipant[];
}

export interface CalendarParticipant extends Member {
  role: CalendarRole;
}

export type CalendarRole = "OWNER" | "VIEWER" | "EDITOR";
