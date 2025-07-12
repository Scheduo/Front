export interface ScheduleCalendar {
  id: number;
  title: string;
  participants: CalendarParticipant[];
}

export interface CalendarInfo {
  calendarId: number;
  title: string;
}

export interface CalendarParticipant {
  memberId: number;
  role: CalendarRole;
}

export type CalendarRole = "OWNER" | "VIEW" | "EDIT";
