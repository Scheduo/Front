import { Button } from "@/shared/ui/button";
import { Calendar, PenSquare, Plus, Settings } from "lucide-react";
import { useState } from "react";

const calendarList = [
	{
		calendarId: 1,
		title: "Personal Calendarddddddddd",
	},
	{
		calendarId: 2,
		title: "Team Calendar",
	},
];

export function LeftSidebar() {
	const [isCalendarHovered, setIsCalendarHovered] = useState(false);

	const handleAddCalendar = () => {
		console.log("캘린더 생성");
	};
	const handleEditCalendar = () => {
		console.log("캘린더 수정");
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
					onMouseEnter={() => setIsCalendarHovered(true)}
					onMouseLeave={() => setIsCalendarHovered(false)}
				>
					<div className="flex items-center gap-2">
						<Calendar size={18} />
						<span>Calendar</span>
					</div>
					{isCalendarHovered && (
						<div className="flex space-x-1">
							<Button
								size="icon"
								variant="ghost"
								className="hover:bg-transparent"
								onClick={handleEditCalendar}
							>
								<PenSquare size={16} className="text-grayscale-500" />
							</Button>
							<Button
								size="icon"
								variant="ghost"
								className="hover:bg-transparent"
								onClick={handleAddCalendar}
							>
								<Plus size={16} className="text-grayscale-500" />
							</Button>
						</div>
					)}
				</div>

				<div className="mt-2 ml-6 space-y-2">
					{calendarList.map((calendar) => (
						<div
							key={calendar.calendarId}
							className="my-3 flex h-8 flex-1 cursor-pointer items-center rounded-md p-3 hover:bg-grayscale-200"
						>
							<span className="truncate text-grayscale-500 text-medium-m">
								{calendar.title}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* User info and settings section */}
			<div className="flex items-center justify-between p-4">
				<div className="flex flex-col items-start justify-center gap-2">
					<span className="font-medium text-grayscale-700 text-sm">홍길동</span>
					<span className="text-grayscale-700 text-xs">abcd@gmail.com</span>
				</div>
				<Button size="icon" variant="ghost" onClick={handleOpenSetting}>
					<Settings size={18} className="text-grayscale-700" />
				</Button>
			</div>
		</div>
	);
}
