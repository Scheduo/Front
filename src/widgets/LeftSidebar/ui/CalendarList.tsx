import { calendarApi, useCalendarStore } from "@/entities/calendar";
import { EditCalendar } from "@/features/edit-calendar";
import { useEffect, useState } from "react";

export const CalendarList = () => {
  const { calendars, setCalendars } = useCalendarStore();
  const [hoveredCalendarId, setHoveredCalendarId] = useState<number>(-1);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const response = await calendarApi.getCalendarList();
        setCalendars(response.calendars.map((c) => ({ id: c.id, title: c.title })));
      } catch (error) {
        console.error("Failed to fetch calendars:", error);
      }
    };

    fetchCalendars();
  }, [setCalendars]);

  return (
    <div className="mt-2 space-y-3">
      {calendars.map((calendar) => (
        <div
          key={calendar.id}
          className="flex h-9 flex-1 cursor-pointer items-center justify-between rounded-md px-3 hover:bg-grayscale-200"
          onMouseEnter={() => setHoveredCalendarId(calendar.id)}
          onMouseLeave={() => setHoveredCalendarId(-1)}
        >
          <span className="truncate text-grayscale-500 text-medium-m">{calendar.title}</span>
          <div className={`${hoveredCalendarId === calendar.id ? "opacity-100" : "size-0 opacity-0"}`}>
            <EditCalendar calendarId={calendar.id} />
          </div>
        </div>
      ))}
    </div>
  );
};
