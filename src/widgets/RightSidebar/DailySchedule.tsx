import { Button, ScrollArea } from "@/shared/ui";
import { Clock, Plus, Share2 } from "lucide-react";
import type React from "react";
import type { ScheduleItem } from "./types";

interface DailyScheduleProps {
  selectedDate?: Date;
  schedules?: ScheduleItem[];
  onAddSchedule?: () => void;
  onEditSchedule?: (id: string) => void;
  children?: React.ReactNode;
}

export const DailySchedule = ({
  selectedDate = new Date(),
  schedules = [],
  onAddSchedule,
  onEditSchedule,
  children,
}: DailyScheduleProps): React.ReactElement => {
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  return (
    <>
      <div className="h-20 p-6">
        <h2 className="mb-4 text-bold-l text-grayscale-black">{formatDate(selectedDate)}</h2>
        {children && <div className="mb-4">{children}</div>}
      </div>

      <ScrollArea className="w-full flex-1 px-1">
        <div className="mx-auto w-76 space-y-3 pb-6">
          {schedules.length > 0 ? (
            schedules.map((schedule) => (
              <button
                type="button"
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
                      <div className="text-grayscale-500 text-medium-s">{schedule.time}</div>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-between text-grayscale-500 text-medium-s">
                    <div className="truncate">{schedule.location}</div>
                    <div>{schedule.typeName}</div>
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
