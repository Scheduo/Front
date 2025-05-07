import { Button } from "@/shared/ui/button";
import { Calendar, PenSquare, Plus, Settings } from "lucide-react";
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

export function LeftSidebar() {
	const [isCalendarHeaderHovered, setIsCalendarHeaderHovered] =
		useState<boolean>(false);
	const [hoveredCalendarId, setHoveredCalendarId] = useState<number>(-1);

	const handleAddCalendar = () => {
		console.log("캘린더 생성");
	};
	const handleEditCalendar = (calendarId: number) => {
		console.log("캘린더 수정", calendarId);
	};
	const handleOpenSetting = () => {
		console.log("설정창 오픈");
	};

	return (
		<div className="flex h-screen w-64 flex-col border-grayscale-300 border-r">
			<div className="p-4">
				<h1 className="font-semibold text-bold-l text-primary-main">Schedo</h1>
			</div>

			<div className="h-10 flex-1 px-2">
				<div
					className="flex items-center justify-between rounded-lg bg-primary-light p-3 text-primary-main"
					onMouseEnter={() => setIsCalendarHeaderHovered(true)}
					onMouseLeave={() => setIsCalendarHeaderHovered(false)}
				>
					<div className="flex items-center gap-2">
						<Calendar size={18} />
						<span>Calendar</span>
					</div>
					{isCalendarHeaderHovered && (
						<Button
							size="icon"
							variant="ghost"
							className="hover:bg-transparent"
							onClick={handleAddCalendar}
						>
							<Plus size={16} className="text-grayscale-500" />
						</Button>
					)}
				</div>

				<div className="mt-2 ml-6 space-y-2">
					{calendarList.map((calendar: CalendarInfo) => (
						<div
							key={calendar.calendarId}
							className="my-3 flex h-8 flex-1 cursor-pointer items-center justify-between rounded-md p-3 hover:bg-grayscale-200"
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
			</div>

			<div className="flex items-center justify-between p-4">
				<div className="flex flex-col items-start justify-center gap-2">
					<span className="font-medium text-bold-m text-grayscale-700">
						홍길동
					</span>
					<span className="text-grayscale-700 text-medium-s">
						abcd@gmail.com
					</span>
				</div>
				<Button size="icon" variant="ghost" onClick={handleOpenSetting}>
					<Settings size={18} className="text-grayscale-700" />
				</Button>
			</div>
		</div>
	);
}
