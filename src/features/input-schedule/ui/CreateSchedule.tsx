import { useState } from "react";
import { toast } from "sonner";
import type { InputScheduleRequest } from "@/entities/schedule";
import { useCreateSchedule } from "@/entities/schedule";
import { devLogger, useCurrentCalendarId } from "@/shared/lib";
import { ScheduleForm } from "./ScheduleForm";

interface CreateScheduleProps {
  onCancel: () => void;
}

/**
 * 새로운 일정을 생성하는 사이드바 컴포넌트입니다.
 */
export const CreateSchedule = ({ onCancel }: CreateScheduleProps) => {
  const calendarId = useCurrentCalendarId();
  const createScheduleMutation = useCreateSchedule();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: InputScheduleRequest) => {
    if (!calendarId) {
      toast.error("캘린더 ID를 찾을 수 없습니다.");
      return;
    }

    try {
      setIsSubmitting(true);

      // InputScheduleRequest를 CreateScheduleRequest로 변환
      const requestData = {
        title: data.title,
        allDay: data.isAllDay,
        ...(data.isAllDay
          ? {
              startDate: data.startDate,
              endDate: data.endDate,
            }
          : {
              startDateTime: `${data.startDate}T${data.startTime}:00`,
              endDateTime: `${data.endDate}T${data.endTime}:00`,
            }),
        location: data.location || undefined,
        memo: data.memo || undefined,
        category: {
          name: data.category || "기본",
          color: "BLUE" as const,
        },
      };

      devLogger.log("일정 생성 요청:", requestData);

      await createScheduleMutation.mutateAsync({
        calendarId,
        request: requestData,
      });

      toast.success("일정이 생성되었습니다.");
      onCancel(); // 성공 시 사이드바 닫기
    } catch (error) {
      devLogger.error("일정 생성 실패:", error);
      // 에러는 이미 axios interceptor에서 처리됨
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 px-6 py-4">
        <h2 className="text-bold-l text-grayscale-black">새 일정 추가</h2>
      </div>

      <div className="min-h-0 flex-1">
        <ScheduleForm
          onSubmit={handleSubmit}
          onCancel={onCancel}
          isSubmitting={isSubmitting || createScheduleMutation.isPending}
        />
      </div>
    </div>
  );
};
