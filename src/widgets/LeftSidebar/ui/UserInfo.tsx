import { ManageSettings } from "@/features/manage-settings";

export const UserInfo = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col items-start justify-center gap-2">
        <span className="font-medium text-bold-m text-grayscale-700">홍길동</span>
        <span className="text-grayscale-700 text-medium-s">abcd@gmail.com</span>
      </div>
      <ManageSettings />
    </div>
  );
};
