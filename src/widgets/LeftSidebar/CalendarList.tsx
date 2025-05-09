import { Button } from "@/shared/ui/button";
import { PenSquare } from "lucide-react";
import { useState } from "react";
import type { CalendarInfo } from "./types";

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

function CalendarList() {
	const [hoveredCalendarId, setHoveredCalendarId] = useState<number>(-1);

	const handleEditCalendar = (calendarId: number) => {
		console.log("캘린더 수정", calendarId);
	};

	return (
		<div className="mt-2 space-y-3">
			{calendarList.map((calendar: CalendarInfo) => (
				<div
					key={calendar.calendarId}
					className="flex h-9 flex-1 cursor-pointer items-center justify-between rounded-md px-3 hover:bg-grayscale-200"
					onMouseEnter={() => setHoveredCalendarId(calendar.calendarId)}
					onMouseLeave={() => setHoveredCalendarId(-1)}
				>
					<span className="truncate text-grayscale-500 text-medium-m">
						{calendar.title}
					</span>
					{hoveredCalendarId === calendar.calendarId && (
						<Button
							size="icon"
							variant="ghost"
							className="hover:bg-transparent"
							onClick={() => handleEditCalendar(calendar.calendarId)}
						>
							<PenSquare size={16} className="text-grayscale-500" />
						</Button>
					)}
				</div>
			))}
		</div>
	);
}

export default CalendarList;
