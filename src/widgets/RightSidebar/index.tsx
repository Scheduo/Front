import { Button } from "@/shared/ui/Button";
import { Bell, Search } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { DailySchedule } from "./DailySchedule";

type RightSidebarViewType = "daily" | "share" | "create" | "edit" | "search" | "notification";

export const RightSidebar = (): React.ReactElement => {
  const [currentView, setCurrentView] = useState<RightSidebarViewType>("daily");

  const renderContent = () => {
    switch (currentView) {
      case "daily":
        return <DailySchedule />;
      case "share":
        return <div>일정 공유</div>;
      case "create":
        return <div>일정 생성</div>;
      case "edit":
        return <div>일정 수정</div>;
      case "search":
        return <div>일정 검색</div>;
      case "notification":
        return <div>알림</div>;
      default:
        return <DailySchedule />;
    }
  };

  return (
    <div className="flex h-screen w-80 flex-col overflow-hidden border-gray-200 border-l bg-white shadow-lg">
      <div className="flex h-12 items-center justify-end gap-2 p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView("search")}
          className="h-8 w-8 p-0"
          aria-label="검색"
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView("notification")}
          className="h-8 w-8 p-0"
          aria-label="알림"
        >
          <Bell className="h-4 w-4" />
        </Button>
      </div>

      {renderContent()}
    </div>
  );
};
