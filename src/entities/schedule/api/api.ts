import { axiosInstance } from "@/shared/api/axios";
import type { ApiResponse, CreateScheduleRequest, DailyScheduleResponse, MonthlyScheduleResponse } from "./types";

export const scheduleApi = {
  // 일정 생성
  createSchedule: async (calendarId: number, request: CreateScheduleRequest): Promise<ApiResponse<{ id: number }>> => {
    const response = await axiosInstance.post<ApiResponse<{ id: number }>>(
      `/calendars/${calendarId}/schedules`,
      request,
    );
    return response.data;
  },

  // 특정 날짜 일정 조회
  getSchedulesByDate: async (calendarId: number, date: string): Promise<ApiResponse<DailyScheduleResponse[]>> => {
    const response = await axiosInstance.get<ApiResponse<DailyScheduleResponse[]>>(
      `/calendars/${calendarId}/schedules/daily`,
      {
        params: { date }, // yyyy-mm-dd 형식
      },
    );
    return response.data;
  },

  // 월별 일정 조회
  getSchedulesByMonth: async (calendarId: number, date: string): Promise<ApiResponse<MonthlyScheduleResponse[]>> => {
    const response = await axiosInstance.get<ApiResponse<MonthlyScheduleResponse[]>>(
      `/calendars/${calendarId}/schedules/monthly`,
      {
        params: { date }, // yyyy-mm 형식
      },
    );
    return response.data;
  },

  // 기존 함수들 (향후 구현 예정)
  getTodaySchedules: async () => {},
  getUpcomingSchedules: async () => {},
  getSchedulesByPeriod: async () => {},
  getSchedulesByPeriodAndCalendar: async () => {},
  getScheduleById: async () => {},
  updateSchedule: async () => {},
  deleteSchedule: async () => {},
  shareSchedule: async () => {},
  searchSchedules: async () => {},
};
