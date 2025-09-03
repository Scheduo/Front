import type { CalendarCategory, CalendarCategoryColor, NotificationTime, Schedule, ScheduleRecurrence } from "../model";

export type InputScheduleRequest = Omit<Schedule, "id" | "calendar">;

// 특정 날짜 일정 조회 응답
export interface DailyScheduleResponse {
  id: number;
  title: string;
  startDateTime: string; // "2025-05-21T10:00:00"
  endDateTime: string; // "2025-05-21T11:00:00"
  location: string;
  category: string;
  memo: string;
  notificationTime: NotificationTime;
  recurrence: ScheduleRecurrence;
  allDay: boolean;
}

// 월별 일정 조회 응답
export interface MonthlyScheduleResponse {
  calendarId: number;
  schedules: MonthlyScheduleItem[];
}

export interface MonthlyScheduleItem {
  id: number;
  title: string;
  startDate: string; // "2025-05-21"
  endDate: string; // "2025-05-21"
  category: {
    name: CalendarCategory;
    color: CalendarCategoryColor;
  };
}

// 일정 생성 요청 (실제 API 스펙에 맞게 수정)
export interface CreateScheduleRequest {
  title: string;
  startDateTime?: string;
  endDateTime?: string;
  allDay: boolean;
  location?: string;
  memo?: string;
  category: CalendarCategory;
  notificationTime?: NotificationTime;
  recurrence?: ScheduleRecurrence;
}

// 일정 수정 요청 (생성과 동일한 구조)
export type UpdateScheduleRequest = CreateScheduleRequest;

// 일정 상세 조회 응답
export interface ScheduleDetailResponse {
  id: number;
  title: string;
  startDateTime?: string;
  endDateTime?: string;
  startDate?: string;
  endDate?: string;
  allDay: boolean;
  location?: string;
  memo?: string;
  category: string;
  notificationTime?: NotificationTime;
  recurrence?: ScheduleRecurrence;
}
