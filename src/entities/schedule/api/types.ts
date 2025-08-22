import type { CalendarRole } from "@/entities/calendar";
import type { Schedule } from "../model";

export type InputScheduleRequest = Omit<Schedule, "id" | "calendar">;

// 카테고리 타입
export interface ScheduleCategory {
  name: string;
  color: "RED" | "BLUE" | "GREEN" | "YELLOW" | "PURPLE" | "ORANGE" | "PINK" | "GRAY";
}

// 특정 날짜 일정 조회 응답
export interface DailyScheduleResponse {
  id: number;
  title: string;
  startDateTime: string; // "2025-05-21T10:00:00"
  endDateTime: string; // "2025-05-21T11:00:00"
  category: ScheduleCategory;
  allDay: boolean;
}

// 월별 일정 조회 응답
export interface MonthlyScheduleResponse {
  id: number;
  title: string;
  startDate: string; // yyyy-mm-dd
  endDate: string;
  category: ScheduleCategory;
}

// 일정 생성 요청 (실제 API 스펙에 맞게 수정)
export interface CreateScheduleRequest {
  title: string;
  startDateTime?: string; // allDay가 false일 때 필수
  endDateTime?: string; // allDay가 false일 때 필수
  startDate?: string; // allDay가 true일 때 사용
  endDate?: string; // allDay가 true일 때 사용
  allDay: boolean;
  location?: string;
  memo?: string;
  category: {
    name: string;
    color: "RED" | "BLUE" | "GREEN" | "YELLOW" | "PURPLE" | "ORANGE" | "PINK" | "GRAY";
  };
  notificationTime?: "ONE_DAY_BEFORE" | "ONE_HOUR_BEFORE" | "THIRTY_MINUTES_BEFORE" | "FIVE_MINUTES_BEFORE";
  recurrence?: {
    frequency: string;
    recurrenceEndDate: string;
  };
  participants?: Array<{
    memberId: number;
    role: CalendarRole;
  }>;
}

// API 응답 래퍼
export interface ApiResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}
