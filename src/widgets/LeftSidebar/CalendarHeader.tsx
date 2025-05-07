import { Button } from "@/shared/ui/button";
import { Calendar, Plus } from "lucide-react";
import { useState } from "react";

function CalendarHeader() {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const handleAddCalendar = () => {
		console.log("캘린더 생성");
	};

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
			{isHovered && (
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
	);
}

export default CalendarHeader;
