import CalendarHeader from "./CalendarHeader";
import CalendarList from "./CalendarList";
import UserInfo from "./UserInfo";

export function LeftSidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-grayscale-300 border-r">
      <div className="p-4">
        <h1 className="font-semibold text-bold-l text-primary-main">Schedo</h1>
      </div>

      <div className="h-10 flex-1 px-2">
        <CalendarHeader />
        <CalendarList />
      </div>

      <UserInfo />
    </div>
  );
}
