import { Button } from "@/shared/ui/Button";
import { Bell, Search } from "lucide-react";
import type React from "react";
import { DailySchedule } from "./DailySchedule";

interface RightSidebarProps {
  onSearch?: () => void;
  onNotification?: () => void;
  children: React.ReactNode;
}

export const RightSidebar = ({ onSearch, onNotification, children }: RightSidebarProps): React.ReactElement => {
  return (
    <div className="flex h-screen w-80 flex-col overflow-hidden border-gray-200 border-l bg-white shadow-lg">
      <div className="flex h-12 items-center justify-end gap-2 p-4">
        <Button variant="ghost" size="sm" onClick={onSearch} className="h-8 w-8 p-0" aria-label="검색">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onNotification} className="h-8 w-8 p-0" aria-label="알림">
          <Bell className="h-4 w-4" />
        </Button>
      </div>

      <DailySchedule />
      {children}
    </div>
  );
};
