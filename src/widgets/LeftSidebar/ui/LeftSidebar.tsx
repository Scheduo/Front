import { CalendarHeader } from "./CalendarHeader";
import { CalendarList } from "./CalendarList";
import { UserInfo } from "./UserInfo";

/**
 * 메인 캘린더 화면의 왼쪽 사이드바 컴포넌트입니다.
 * 상단에는 앱 로고와 캘린더 헤더, 중앙에는 사용자가 속한 캘린더 목록,
 * 하단에는 로그인한 사용자 정보와 설정 버튼을 표시합니다.
 */
export const LeftSidebar = () => {
  return (
    <div className="flex h-screen w-64 flex-col border-grayscale-300 border-r">
      <div className="p-4">
        <h1 className="font-semibold text-bold-l text-primary-main">Scheduo</h1>
      </div>

      <div className="h-10 flex-1 px-2">
        <CalendarHeader />
        <CalendarList />
      </div>

      <UserInfo />
    </div>
  );
};
