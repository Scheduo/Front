import type { ShareScheduleItemType } from "../model";
import { ToggleCheckButton } from "./ToggleCheckButton";

interface ShareScheduleItemProps {
  schedule: ShareScheduleItemType;
  isSelected: boolean;
  toggleScheduleSelection: (id: number, date: string) => void;
}

/**
 * 공유 일정 목록에서 개별 일정 항목을 표시하는 컴포넌트입니다.
 * 일정 제목, 날짜/시간 정보와 함께 선택/해제가 가능한 토글 버튼을 제공합니다.
 *
 * @param schedule 일정 정보 (제목, 날짜, 시작/종료 시간 포함)
 * @param isSelected 현재 일정의 선택 상태
 * @param toggleScheduleSelection 일정 선택 상태를 변경하는 함수
 */
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
