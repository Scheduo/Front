import { useEffect, useState } from "react";
import type { InputScheduleRequest } from "@/entities/schedule";
import { useScheduleDetail, useUpdateSchedule } from "@/entities/schedule";
import { useCurrentCalendarId } from "@/shared/lib";
import { ScheduleForm } from "./ScheduleForm";

interface EditScheduleProps {
  scheduleId?: number;
  onCancel: () => void;
}

/**
 * 일정을 수정하는 사이드바 컴포넌트입니다.
 */
export const EditSchedule = ({ scheduleId, onCancel }: EditScheduleProps) => {
  const [initialData, setInitialData] = useState<InputScheduleRequest | undefined>(undefined);
  const calendarId = useCurrentCalendarId();
  const updateSchedule = useUpdateSchedule();

  // 일정 상세 정보 조회
  const {
    data: scheduleDetail,
    isLoading,
    error,
  } = useScheduleDetail(calendarId ?? 0, scheduleId ?? 0, {
    enabled: !!calendarId && !!scheduleId,
  });

  // API 응답을 InputScheduleRequest 형태로 변환
  useEffect(() => {
    if (scheduleDetail) {
      const data: InputScheduleRequest = {
        title: scheduleDetail.title,
        isAllDay: scheduleDetail.allDay,
        startDate: scheduleDetail.allDay ? scheduleDetail.startDate! : scheduleDetail.startDateTime!.split("T")[0],
        startTime: scheduleDetail.allDay ? "00:00" : scheduleDetail.startDateTime!.split("T")[1].slice(0, 5),
        endDate: scheduleDetail.allDay ? scheduleDetail.endDate! : scheduleDetail.endDateTime!.split("T")[0],
        endTime: scheduleDetail.allDay ? "01:00" : scheduleDetail.endDateTime!.split("T")[1].slice(0, 5),
        location: scheduleDetail.location || "",
        category: scheduleDetail.category.name,
        memo: scheduleDetail.memo || "",
        notificationTime: scheduleDetail.notificationTime || "FIVE_MINUTES_BEFORE",
        recurrence: scheduleDetail.recurrence
          ? {
              recurrenceRule: scheduleDetail.recurrence.frequency,
              recurrenceEndDate: scheduleDetail.recurrence.recurrenceEndDate,
            }
          : undefined,
      };
      setInitialData(data);
    }
  }, [scheduleDetail]);

  const handleSubmit = async (data: InputScheduleRequest) => {
    if (!calendarId || !scheduleId) return;

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
        name: data.category,
        color: "BLUE" as const,
      },
      ...(data.notificationTime && { notificationTime: data.notificationTime }),
      ...(data.recurrence && {
        recurrence: {
          frequency: data.recurrence.recurrenceRule,
          recurrenceEndDate: data.recurrence.recurrenceEndDate,
        },
      }),
    };

    updateSchedule.mutate(
      { calendarId, scheduleId, request: requestData },
      {
        onSuccess: () => {
          onCancel();
        },
      },
    );
  };

  if (!calendarId || !scheduleId) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-grayscale-400 text-medium-m">일정을 선택해주세요.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-grayscale-400 text-medium-m">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-grayscale-400 text-medium-m">일정을 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 px-6 py-4">
        <h2 className="text-bold-l text-grayscale-black">일정 편집</h2>
      </div>

      <div className="min-h-0 flex-1">
        <ScheduleForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={onCancel}
          isSubmitting={updateSchedule.isPending}
        />
      </div>
    </div>
  );
};
