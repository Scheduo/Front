import { CreateCalendar } from "@/features/input-calendar";
import { Calendar } from "lucide-react";

export const CalendarHeader = () => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-primary-light p-3 text-primary-main">
      <div className="flex items-center gap-2">
        <Calendar size={18} />
        <span>Calendar</span>
      </div>
      <CreateCalendar />
    </div>
  );
};
