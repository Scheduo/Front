import { Button } from "@/shared/ui/Button";
import { Settings } from "lucide-react";

function UserInfo() {
  const handleOpenSetting = () => {
    console.log("설정창 오픈");
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col items-start justify-center gap-2">
        <span className="font-medium text-bold-m text-grayscale-700">홍길동</span>
        <span className="text-grayscale-700 text-medium-s">abcd@gmail.com</span>
      </div>
      <Button size="icon" variant="ghost" onClick={handleOpenSetting}>
        <Settings size={18} className="text-grayscale-700" />
      </Button>
    </div>
  );
}

export default UserInfo;
