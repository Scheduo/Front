import { Button, ScrollArea } from "@/shared/ui";
import { Clock, Plus, Share2 } from "lucide-react";
import type React from "react";
import type { ScheduleItem } from "./types";

interface DailyScheduleProps {
  /** 표시할 날짜. 기본값은 오늘 날짜 */
  selectedDate?: Date;
  /** 해당 날짜의 일정 목록 */
  schedules?: ScheduleItem[];
  /** 일정 추가 버튼 클릭 시 실행될 콜백 함수 */
  onAddSchedule?: () => void;
  /** 일정 항목 클릭 시 실행될 콜백 함수 */
  onEditSchedule?: (id: number) => void;
}

/**
 * 선택된 날짜의 일정 목록을 세로로 나열하여 보여주는 컴포넌트입니다.
 * 각 일정 항목에는 제목, 시간, 장소, 소속 캘린더 정보가 표시됩니다.
 *
 * 헤더에는 날짜가 표시되고, 하단에는 일정 추가와 공유 버튼이 배치되어 있습니다.
 *
 * @param selectedDate - 표시할 날짜 (기본값: 오늘)
 * @param schedules - 해당 날짜의 일정 목록 (기본값: 빈 배열)
 * @param onAddSchedule - 일정 추가 버튼 클릭 시 실행될 콜백
 * @param onEditSchedule - 일정 항목 클릭 시 실행될 콜백 (일정 ID 전달)
 */

export const DailySchedule = ({
  selectedDate = new Date(),
  schedules = [],
  onAddSchedule,
  onEditSchedule,
}: DailyScheduleProps): React.ReactElement => {
  /**
   * 날짜를 "월일" 형식으로 포맷합니다.
   *
   * @param date - 포맷할 날짜 객체
   * @returns "3월 15일" 형식의 문자열
   */
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  return (
    <>
      <div className="h-20 p-6">
        <h2 className="mb-4 text-bold-l text-grayscale-black">{formatDate(selectedDate)}</h2>
      </div>

      <ScrollArea className="w-full flex-1 px-1">
        <div className="mx-auto w-76 space-y-3 pb-6">
          {schedules.length > 0 ? (
            schedules.map((schedule) => (
              <button
                type="button"
                aria-label={`일정: ${schedule.title}`}
                key={schedule.id}
                className="group w-full cursor-pointer rounded-lg border border-grayscale-100 p-4 shadow transition-colors hover:bg-grayscale-100"
                onClick={() => onEditSchedule?.(schedule.id)}
              >
                <div className="flex w-full flex-col items-start justify-between">
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-2 w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-left text-grayscale-black">
                        {schedule.title}
                      </h3>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-1">
                      <Clock className="h-4 w-4 text-grayscale-500" />
                      <div className="text-grayscale-500 text-medium-s">
                        {schedule.isAllDAy ? "하루 종일" : `${schedule.startTime}~${schedule.endTime}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-between text-grayscale-500 text-medium-s">
                    <div className="truncate">{schedule.location}</div>
                    <div>{schedule.calendar.name}</div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="mt-5 flex items-center justify-center text-grayscale-500">오늘 일정이 없습니다.</div>
          )}
        </div>
      </ScrollArea>

      <div className="p-6">
        <div className="flex gap-2">
          <Button onClick={onAddSchedule} className="flex-1">
            <Plus className="mr-2 h-4 w-4" />
            일정 추가
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            일정 공유
          </Button>
        </div>
      </div>
    </>
  );
};
