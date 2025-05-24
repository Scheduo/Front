import { Button } from "@/shared/ui/Button";
import { Bell, Search } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { DailySchedule } from "./DailySchedule";

type RightSidebarViewType = "daily" | "share" | "create" | "edit" | "search" | "notification";

/**
 * 애플리케이션 우측에 위치하는 사이드바 컴포넌트입니다.
 * 일정 관리와 관련된 다양한 뷰를 내부 상태에 따라 동적으로 렌더링합니다.
 *
 * 헤더 영역의 검색과 알림 버튼을 통해 해당 기능으로 뷰를 전환할 수 있으며,
 * 메인 콘텐츠 영역에서는 일정 조회, 생성, 수정, 공유, 검색, 알림 등의 기능을 제공합니다.
 */

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
