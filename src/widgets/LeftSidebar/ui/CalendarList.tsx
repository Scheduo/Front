import { EditCalendar } from "@/features/edit-calendar";
import { useState } from "react";

type CalendarInfo = {
  calendarId: number;
  title: string;
};

const calendarList = [
  {
    calendarId: 1,
    title: "Personal Calendarddddddddddd",
  },
  {
    calendarId: 2,
    title: "Team Calendar",
  },
];

export const CalendarList = () => {
  const [hoveredCalendarId, setHoveredCalendarId] = useState<number>(-1);

  return (
    <div className="mt-2 space-y-3">
      {calendarList.map((calendar: CalendarInfo) => (
        <div
          key={calendar.calendarId}
          className="flex h-9 flex-1 cursor-pointer items-center justify-between rounded-md px-3 hover:bg-grayscale-200"
          onMouseEnter={() => setHoveredCalendarId(calendar.calendarId)}
          onMouseLeave={() => setHoveredCalendarId(-1)}
        >
          <span className="truncate text-grayscale-500 text-medium-m">{calendar.title}</span>
          <div className={`${hoveredCalendarId === calendar.calendarId ? "opacity-100" : "size-0 opacity-0"}`}>
            <EditCalendar calendarId={calendar.calendarId} />
          </div>
        </div>
      ))}
    </div>
  );
};
