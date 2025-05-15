import { Calendar, LeftSidebar, RightSidebar } from "@/widgets";

function App() {
  return (
    <div className="flex h-screen w-screen flex-row">
      <LeftSidebar />
      <Calendar />
      <RightSidebar />
    </div>
  );
}

export default App;
