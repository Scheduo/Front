import { useEffect, useState } from "react";
import type { InputScheduleRequest } from "@/entities/schedule";
import { useScheduleDetail, useUpdateSchedule } from "@/entities/schedule";
import { useCurrentCalendarId } from "@/shared/lib";
import { ScheduleForm } from "./ScheduleForm";

interface EditScheduleProps {
  scheduleId?: number;
  initialScheduleData?: any;
  onCancel: () => void;
}

/**
 * 일정을 수정하는 사이드바 컴포넌트입니다.
 */
export const EditSchedule = ({ scheduleId, initialScheduleData, onCancel }: EditScheduleProps) => {
  const [initialData, setInitialData] = useState<InputScheduleRequest | undefined>(undefined);
  const calendarId = useCurrentCalendarId();
  const updateSchedule = useUpdateSchedule();

  // 전달받은 데이터가 있으면 사용, 없으면 API 호출
  const {
    data: scheduleDetail,
    isLoading,
    error,
  } = useScheduleDetail(calendarId ?? 0, scheduleId ?? 0, {
    enabled: !!calendarId && !!scheduleId && !initialScheduleData,
  });

  // 전달받은 데이터 또는 API 응답을 InputScheduleRequest 형태로 변환
  useEffect(() => {
    const dataToUse = initialScheduleData || scheduleDetail;
    if (dataToUse) {
      const data: InputScheduleRequest = {
        title: dataToUse.title,
        isAllDay: dataToUse.allDay,
        startDate: dataToUse.allDay ? dataToUse.startDate! : dataToUse.startDateTime!.split("T")[0],
        startTime: dataToUse.allDay ? "00:00" : dataToUse.startDateTime!.split("T")[1].slice(0, 5),
        endDate: dataToUse.allDay ? dataToUse.endDate! : dataToUse.endDateTime!.split("T")[0],
        endTime: dataToUse.allDay ? "01:00" : dataToUse.endDateTime!.split("T")[1].slice(0, 5),
        location: dataToUse.location || "",
        category: dataToUse.category.name,
        memo: dataToUse.memo || "",
        notificationTime: dataToUse.notificationTime || "FIVE_MINUTES_BEFORE",
        recurrence: dataToUse.recurrence
          ? {
              recurrenceRule: dataToUse.recurrence.frequency,
              recurrenceEndDate: dataToUse.recurrence.recurrenceEndDate,
            }
          : undefined,
      };
      setInitialData(data);
    }
  }, [initialScheduleData, scheduleDetail]);

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

  if (!initialScheduleData && isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-grayscale-400 text-medium-m">로딩 중...</div>
      </div>
    );
  }

  if (!initialScheduleData && error) {
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
