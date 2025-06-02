import { useState } from "react";
import { ScheduleForm } from "./ScheduleForm";
import type { ScheduleRequest } from "./ScheduleFormTypes";

interface CreateScheduleProps {
  onSubmit?: (data: ScheduleRequest) => void;
  onCancel: () => void;
}

/**
 * 새로운 일정을 생성하는 사이드바 컴포넌트입니다.
 */
export const CreateSchedule = ({ onSubmit, onCancel }: CreateScheduleProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ScheduleRequest) => {
    setIsSubmitting(true);

    try {
      // 시뮬레이션: API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit?.(data);
    } catch (error) {
      console.error("일정 저장 중 오류가 발생했습니다:", error);
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
        <ScheduleForm onSubmit={handleSubmit} onCancel={onCancel} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};
