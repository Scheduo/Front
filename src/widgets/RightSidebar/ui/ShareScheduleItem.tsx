import type { ShareScheduleItemType } from "../types";
import { ToggleCheckButton } from "./ToggleCheckButton";

interface ShareScheduleItemProps {
  schedule: ShareScheduleItemType;
  isSelected: boolean;
  toggleScheduleSelection: (id: number, date: string) => void;
}

export const ShareScheduleItem = ({ schedule, isSelected, toggleScheduleSelection }: ShareScheduleItemProps) => {
  return (
    <div key={schedule.id} className="rounded-lg border border-grayscale-300 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="mb-1 text-grayscale-700 text-medium-r">{schedule.title}</h3>
          <p className="text-grayscale-700 text-medium-s">{`${schedule.date} ${schedule.startTime} - ${schedule.endTime}`}</p>
        </div>
        <ToggleCheckButton
          isSelected={isSelected}
          onToggle={() => toggleScheduleSelection(schedule.id, schedule.date)}
          ariaLabel={`${schedule.title} 일정 ${isSelected ? "선택 해제" : "선택"}하기`}
        />
      </div>
    </div>
  );
};
