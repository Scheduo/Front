import { CreateCalendar } from "@/features/input-calendar";
import { Calendar } from "lucide-react";
import { useState } from "react";

export const CalendarHeader = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="flex items-center justify-between rounded-lg bg-primary-light p-3 text-primary-main"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2">
        <Calendar size={18} />
        <span>Calendar</span>
      </div>
      {isHovered && <CreateCalendar />}
    </div>
  );
};
