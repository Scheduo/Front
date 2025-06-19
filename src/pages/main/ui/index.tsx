import { Calendar, LeftSidebar, RightSidebar } from "@/widgets";

export const Main = () => {
  return (
    <div className="flex h-screen w-screen flex-row">
      <LeftSidebar />
      <Calendar />
      <RightSidebar />
    </div>
  );
};
