import type { CalendarParticipant } from "../model";

export interface CreateCalendarRequest {
  title: string;
  participants: CalendarParticipant[];
}

export interface CreateCalendarResponse {
  calendarId: number;
  title: string;
}

export interface UpdateCalendarRequest {
  title: string;
  nickname: string;
}

export interface InviteToCalendarRequest {
  memberId: number;
}

export interface GetCalendarListResponse {
  calendars: CalendarInfo[];
}

interface CalendarInfo {
  calendarId: number;
  title: string;
}
