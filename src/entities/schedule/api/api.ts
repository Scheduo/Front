import { axiosInstance } from "@/shared/api/axios";
import type {
  CreateScheduleRequest,
  DailyScheduleResponse,
  MonthlyScheduleResponse,
  ScheduleDetailResponse,
  UpdateScheduleRequest,
} from "./types";

export const scheduleApi = {
  // 일정 생성
  createSchedule: async (calendarId: number, request: CreateScheduleRequest): Promise<{ id: number }> => {
    const response = await axiosInstance.post(`/calendars/${calendarId}/schedules`, request);
    return response.data;
  },

  // 특정 날짜 일정 조회
  getSchedulesByDate: async (calendarId: number, date: string): Promise<DailyScheduleResponse[]> => {
    const response = await axiosInstance.get(`/calendars/${calendarId}/schedules/daily`, {
      params: { date }, // yyyy-mm-dd 형식
    });
    return response.data;
  },

  // 월별 일정 조회
  getSchedulesByMonth: async (calendarId: number, date: string): Promise<MonthlyScheduleResponse[]> => {
    const response = await axiosInstance.get(`/calendars/${calendarId}/schedules/monthly`, {
      params: { date }, // yyyy-mm 형식
    });
    return response.data;
  },

  // 일정 상세 조회
  getScheduleById: async (calendarId: number, scheduleId: number): Promise<ScheduleDetailResponse> => {
    const response = await axiosInstance.get(`/calendars/${calendarId}/schedules/${scheduleId}`);
    return response.data;
  },

  // 일정 수정
  updateSchedule: async (calendarId: number, scheduleId: number, request: UpdateScheduleRequest): Promise<void> => {
    const response = await axiosInstance.put(`/calendars/${calendarId}/schedules/${scheduleId}`, request);
    return response.data;
  },

  // 기존 함수들 (향후 구현 예정)
  getTodaySchedules: async () => {},
  getUpcomingSchedules: async () => {},
  getSchedulesByPeriod: async () => {},
  getSchedulesByPeriodAndCalendar: async () => {},
  deleteSchedule: async () => {},
  shareSchedule: async () => {},
  searchSchedules: async () => {},
};
