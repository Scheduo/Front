import { useEffect, useState } from "react";
import type { CalendarCategory, InputScheduleRequest } from "@/entities/schedule";
import { useUpdateSchedule } from "@/entities/schedule";
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

  // initialScheduleData를 InputScheduleRequest 형태로 변환
  useEffect(() => {
    if (initialScheduleData) {
      const data: InputScheduleRequest = {
        title: initialScheduleData.title,
        isAllDay: initialScheduleData.startDate === initialScheduleData.endDate,
        startDate: initialScheduleData.startDate,
        startTime: "00:00", // API에서 시간 정보가 없으므로 기본값
        endDate: initialScheduleData.endDate,
        endTime: "01:00", // API에서 시간 정보가 없으므로 기본값
        location: "", // API에서 location 정보가 없음
        category: initialScheduleData.category.name as CalendarCategory,
        memo: "", // API에서 memo 정보가 없음
        notificationTime: "FIVE_MINUTES_BEFORE", // 기본값
        recurrence: null, // 기본값
      };
      setInitialData(data);
    }
  }, [initialScheduleData]);

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
      category: data.category,
      ...(data.notificationTime && { notificationTime: data.notificationTime }),
      ...(data.recurrence && {
        recurrence: {
          frequency: data.recurrence.frequency,
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

  if (!calendarId || !scheduleId || !initialScheduleData) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-grayscale-400 text-medium-m">일정을 선택해주세요.</div>
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
