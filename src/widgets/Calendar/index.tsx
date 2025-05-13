import { Button } from "@/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { DAY_NAMES } from "./consts";
import { CurrentMonthEvents } from "./sampleData";

export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  color: string;
};

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  }, [currentDate]);

  const eventMatrix = useMemo(() => {
    const matrix: { [date: string]: (Event | null)[] } = {};
    const allEvents = CurrentMonthEvents;
    const allDates = calendarDays.map(({ date }) => new Date(date.getFullYear(), date.getMonth(), date.getDate()));

    type PlacedEvent = Event & { row: number };
    const placedEvents: PlacedEvent[] = [];
    const dateRowMap: { [date: string]: (string | null)[] } = {};
    for (const date of allDates) {
      dateRowMap[date.toDateString()] = [];
    }

    for (const event of allEvents) {
      const eventDates = allDates.filter((d) => d >= event.startDate && d <= event.endDate);
      let row = 0;
      while (true) {
        const conflict = eventDates.some((d) => dateRowMap[d.toDateString()][row] != null);
        if (!conflict) break;
        row++;
      }
      for (const d of eventDates) {
        dateRowMap[d.toDateString()][row] = event.id;
      }
      placedEvents.push({ ...event, row });
    }

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

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isSelectedDate = (date: Date) => {
    return selectedDate && isSameDay(date, selectedDate);
  };

  return (
    <div className="max-w-4xl rounded-lg bg-white">
      <div className="flex h-14 items-center justify-center border-b">
        <div className="flex w-70 items-center justify-between gap-2">
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
      </div>

      <div className=" grid grid-cols-7">
        {DAY_NAMES.map((day, index) => (
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

      <div className="grid grid-cols-7">
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const isSelected = isSelectedDate(date);
          const dayKey = date.toDateString();
          const dayEvents = eventMatrix[dayKey] || [];

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
