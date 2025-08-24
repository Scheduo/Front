import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { scheduleApi } from "./api";
import type {
  CreateScheduleRequest,
  MonthlyScheduleResponse,
  ScheduleDetailResponse,
  UpdateScheduleRequest,
} from "./types";

// 쿼리 키 팩토리
export const scheduleKeys = {
  daily: (calendarId: number, date: string) => ["schedules", "daily", calendarId, date] as const,
  monthly: (calendarId: number, date: string) => ["schedules", "monthly", calendarId, date] as const,
  detail: (calendarId: number, scheduleId: number) => ["schedules", "detail", calendarId, scheduleId] as const,
};

// 특정 날짜 일정 조회
export const useDailySchedules = (calendarId: number, date: string) => {
  return useQuery({
    queryKey: scheduleKeys.daily(calendarId, date),
    queryFn: () => scheduleApi.getSchedulesByDate(calendarId, date),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

// 월별 일정 조회
export const useMonthlySchedules = (
  calendarId: number,
  date: string,
  options?: Partial<UseQueryOptions<MonthlyScheduleResponse[], Error, MonthlyScheduleResponse[]>>,
) => {
  return useQuery({
    queryKey: scheduleKeys.monthly(calendarId, date),
    queryFn: () => scheduleApi.getSchedulesByMonth(calendarId, date),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    ...options,
  });
};

// 일정 상세 조회
export const useScheduleDetail = (
  calendarId: number,
  scheduleId: number,
  options?: Partial<UseQueryOptions<ScheduleDetailResponse, Error, ScheduleDetailResponse>>,
) => {
  return useQuery({
    queryKey: scheduleKeys.detail(calendarId, scheduleId),
    queryFn: () => scheduleApi.getScheduleById(calendarId, scheduleId),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    ...options,
  });
};

// 일정 생성
export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ calendarId, request }: { calendarId: number; request: CreateScheduleRequest }) =>
      scheduleApi.createSchedule(calendarId, request),
    onSuccess: (_, { calendarId }) => {
      // 해당 캘린더의 모든 일정 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["schedules", "daily", calendarId],
      });
      queryClient.invalidateQueries({
        queryKey: ["schedules", "monthly", calendarId],
      });
    },
  });
};

// 일정 수정
export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      calendarId,
      scheduleId,
      request,
    }: {
      calendarId: number;
      scheduleId: number;
      request: UpdateScheduleRequest;
    }) => scheduleApi.updateSchedule(calendarId, scheduleId, request),
    onSuccess: (_, { calendarId, scheduleId }) => {
      // 해당 일정 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.detail(calendarId, scheduleId),
      });
      // 해당 캘린더의 모든 일정 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["schedules", "daily", calendarId],
      });
      queryClient.invalidateQueries({
        queryKey: ["schedules", "monthly", calendarId],
      });
    },
  });
};
