import { Button } from "@/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { CurrentMonthEvents } from "./sampleData";

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

  // interval packing 방식으로 각 이벤트별로 줄(인덱스)을 배정
  const eventMatrix = useMemo(() => {
    const matrix: { [date: string]: (Event | null)[] } = {};
    const allEvents = CurrentMonthEvents;
    // 한 달 전체 날짜 리스트
    const allDates = calendarDays.map(({ date }) => new Date(date.getFullYear(), date.getMonth(), date.getDate()));

    // 각 이벤트별로 줄(인덱스) 할당
    type PlacedEvent = Event & { row: number };
    const placedEvents: PlacedEvent[] = [];
    // 각 날짜별로 해당 줄(row)에 어떤 이벤트가 있는지 기록
    const dateRowMap: { [date: string]: (string | null)[] } = {};
    for (const date of allDates) {
      dateRowMap[date.toDateString()] = [];
    }

    for (const event of allEvents) {
      // 이벤트가 걸쳐 있는 날짜들
      const eventDates = allDates.filter((d) => d >= event.startDate && d <= event.endDate);
      // 각 날짜별로 이미 사용 중인 row를 확인
      let row = 0;
      while (true) {
        // 이 이벤트가 걸친 모든 날짜에서 row가 비어있는지 확인
        const conflict = eventDates.some((d) => dateRowMap[d.toDateString()][row] != null);
        if (!conflict) break;
        row++;
      }
      // 해당 row에 이벤트를 배치
      for (const d of eventDates) {
        dateRowMap[d.toDateString()][row] = event.id;
      }
      placedEvents.push({ ...event, row });
    }

    // 날짜별로 row 인덱스에 맞는 이벤트를 채움
    for (const date of allDates) {
      const rowArr: (Event | null)[] = [];
      const rowIds = dateRowMap[date.toDateString()];
      for (let i = 0; i < rowIds.length; i++) {
        const eventId = rowIds[i];
        if (eventId) {
          const event = allEvents.find((e) => e.id === eventId) || null;
          rowArr.push(event);
        } else {
          rowArr.push(null);
        }
      }
      matrix[date.toDateString()] = rowArr;
    }
    return matrix;
  }, [calendarDays]);

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
          const isSelected = isSelectedDate(date);
          const dayKey = date.toDateString();
          const dayEvents = eventMatrix[dayKey] || [];

          // dayEvents의 각 이벤트에 대해 고유 key를 부여
          // null인 경우에도, 이전 날짜에서 같은 인덱스에 있던 이벤트의 id를 key로 사용
          // 그렇지 않으면 undefined가 key가 됨
          let prevEventIds: (string | undefined)[] = [];
          if (index > 0) {
            const prevDayKey = calendarDays[index - 1].date.toDateString();
            prevEventIds = (eventMatrix[prevDayKey] || []).map((e) => e?.id);
          }

          return (
            <button
              type="button"
              key={`${date.getTime()}-${index}`}
              className={`relative flex h-32 w-32 flex-col items-start justify-start overflow-hidden border border-grayscale-200 transition-colors hover:cursor-pointer ${
                isCurrentMonth ? "hover:bg-grayscale-100" : "text-grayscale-400"
              } ${isSelected ? "z-10 bg-grayscale-200 ring-2 ring-primary-main" : "z-0"}`}
              onClick={() => setSelectedDate(date)}
              aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
            >
              <div
                className={`mb-1 flex h-6 w-6 items-center justify-start px-2 font-medium text-medium-m ${
                  isCurrentMonth ? "text-grayscale-black" : "text-grayscale-400"
                }`}
              >
                {date.getDate()}
              </div>

              {/* 일정 표시 */}
              {isCurrentMonth && (
                <div className="flex h-20 w-full flex-col gap-1 overflow-visible">
                  {dayEvents.slice(0, 3).map((event, eventIndex) => {
                    const key = event ? event.id : prevEventIds[eventIndex] || `empty-${index}-${eventIndex}`;
                    if (!event) {
                      return <div key={key} style={{ height: "20px" }} />;
                    }
                    const isStart = isSameDay(event.startDate, date);
                    const isEnd = isSameDay(event.endDate, date);
                    const isMiddle = !isStart && !isEnd;

                    return (
                      <div
                        key={key}
                        className={`h-5 text-medium-s ${event.color} flex items-center justify-center overflow-hidden ${
                          isStart ? "ml-1 rounded-l-sm" : ""
                        } ${isEnd ? " mr-1 rounded-r-sm" : ""} ${
                          isMiddle ? "rounded-none" : ""
                        } relative z-10 text-grayscale-white`}
                        title={event.title}
                      >
                        {isStart && (
                          <div className="overflow-hidden text-ellipsis whitespace-nowrap px-1">{event.title}</div>
                        )}
                      </div>
                    );
                  })}
                  {dayEvents.filter(Boolean).length > 3 && (
                    <div className="flex h-4 items-center justify-center text-center text-grayscale-500 text-xs">
                      +{dayEvents.filter(Boolean).length - 3}
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
