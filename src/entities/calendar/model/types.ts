export interface ScheduleCalendar {
  id: number;
  name: string;
}

export interface CalendarParticipant {
  memberId: number;
  role: CalendarRole;
}

export type CalendarRole = "OWNER" | "VIEWER" | "EDITOR";
