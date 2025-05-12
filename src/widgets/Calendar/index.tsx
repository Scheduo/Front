import { Button } from "@/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { sampleEvents } from "./sampleData";

export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  color: string;
};

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 2025년 1월
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // 요일 배열 (한국어)
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // 캘린더 날짜 배열 생성
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 첫 번째 날과 마지막 날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 첫 번째 날의 요일 (일요일: 0, 월요일: 1, ...)
    const firstDayOfWeek = firstDay.getDay();

    // 달력에 표시할 날짜들
    const days = [];

    // 이전 달의 마지막 날들 추가
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }

    // 현재 달의 모든 날들 추가
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    // 다음 달의 첫 날들 추가 (42개 칸으로 고정)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  }, [currentDate]);

  // 특정 날짜의 일정들 가져오기
  const getEventsForDate = (date: Date) => {
    return sampleEvents.filter(
      (event) => isSameDay(event.startDate, date) || (date >= event.startDate && date <= event.endDate),
    );
  };

  // 날짜 비교 함수
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 선택된 날짜인지 확인
  const isSelectedDate = (date: Date) => {
    return selectedDate && isSameDay(date, selectedDate);
  };

  return (
    <div className="max-w-4xl rounded-lg bg-white">
      {/* 헤더 */}
      <div className="flex h-14 items-center justify-between border-b">
        <Button onClick={goToPreviousMonth} variant="ghost" size="icon" className="p-2">
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <h2 className="font-semibold text-bold-l">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>

        <Button onClick={goToNextMonth} variant="ghost" size="icon" className="p-2">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* 요일 헤더 */}
      <div className=" grid grid-cols-7">
        {dayNames.map((day, index) => (
          <div
            key={day}
            className={`p-2 text-center font-medium ${
              index === 0 ? "text-notification-strong" : index === 6 ? "text-primary-main" : "text-grayscale-black"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7">
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const events = getEventsForDate(date);
          const isSelected = isSelectedDate(date);

          return (
            <button
              type="button"
              key={`${date.getTime()}-${index}`}
              className={`relative flex h-32 w-32 flex-col items-start justify-start overflow-hidden border border-grayscale-200 p-2 transition-colors hover:cursor-pointer ${
                isCurrentMonth ? "hover:bg-grayscale-100" : "text-grayscale-400"
              } ${isSelected ? "z-10 bg-grayscale-200 ring-2 ring-primary-main" : "z-0"}`}
              onClick={() => setSelectedDate(date)}
              aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
            >
              <div
                className={`mb-1 flex h-6 w-6 items-center justify-start font-medium text-medium-m ${
                  isCurrentMonth ? "text-grayscale-black" : "text-grayscale-400"
                }`}
              >
                {date.getDate()}
              </div>

              {/* 일정 표시 */}
              {isCurrentMonth && (
                <div className="h-20 w-full space-y-0.5 overflow-hidden">
                  {events.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`h-5 p-1 text-medium-s ${event.color} flex w-full items-center justify-center overflow-hidden rounded-sm text-grayscale-white`}
                      title={event.title}
                    >
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap">{event.title}</div>
                    </div>
                  ))}
                  {events.length > 3 && (
                    <div className="flex h-4 items-center justify-center text-center text-grayscale-500 text-xs">
                      +{events.length - 3}
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
