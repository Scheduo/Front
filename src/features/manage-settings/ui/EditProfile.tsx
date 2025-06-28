import { useAuthStore } from "@/shared/stores";
import { Button, Input } from "@/shared/ui";
import { Label } from "@/shared/ui/label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditProfileProps {
  onCancel: () => void;
}

interface ProfileFormData {
  nickname: string;
}

export const EditProfile = ({ onCancel }: EditProfileProps) => {
  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>();

  useEffect(() => {
    if (user) {
      setValue("nickname", user.nickname);
    }
  }, [setValue, user]);

  const onSubmit = async (data: ProfileFormData) => {
    // TODO: 프로필 업데이트 API 호출
    console.log(`${data.nickname} 변경 완료!`);
  };

  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-16 items-center justify-between p-4">
        <h3 className="text-bold-l text-grayscale-black">프로필 편집</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col p-3">
        <div className="flex-1 space-y-6">
          <div className="relative space-y-2">
            <Label htmlFor="nickname" className="font-medium text-gray-700 text-sm">
              닉네임
            </Label>
            <Input
              id="nickname"
              {...register("nickname", {
                required: "닉네임을 입력해주세요",
              })}
              placeholder="닉네임을 입력하세요"
              className="w-full"
            />
            {errors.nickname && (
              <p className="-top-0 absolute right-0 text-medium-s text-notification-strong">
                {errors.nickname.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 p-2">
          <Button type="submit" disabled={isSubmitting} className="w-20">
            {isSubmitting ? "저장 중..." : "저장"}
          </Button>
          <Button type="button" variant="outline" className="w-20" onClick={onCancel}>
            취소
          </Button>
        </div>
      </form>
    </section>
  );
};
