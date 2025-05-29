import { Button } from "@/shared/ui";
import { Check } from "lucide-react";
import type { ShareScheduleItemType } from "../types";

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
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => toggleScheduleSelection(schedule.id, schedule.date)}
          className={`flex h-6 w-6 items-center justify-center transition-colors ${
            isSelected ? "text-primary-main" : "text-grayscale-400"
          }`}
          aria-label={`${schedule.title} 일정 ${isSelected ? "선택 해제" : "선택"}하기`}
        >
          {isSelected ? (
            <div className="flex size-4 items-center justify-center rounded border-1 border-primary-main bg-primary-main">
              <Check className="h-4 w-4 text-white" />
            </div>
          ) : (
            <div className="size-4 rounded border-2 border-grayscale-400 bg-white" />
          )}
        </Button>
      </div>
    </div>
  );
};
