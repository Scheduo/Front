import { useState } from "react";
import type { ScheduleRequest } from "../lib";
import { ScheduleForm } from "./ScheduleForm";

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
    console.log(data, "제출");
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
