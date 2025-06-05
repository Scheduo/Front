import { useState } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";

interface TextConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description: string;
  expectedText: string;
  onConfirm: () => void;
}

/**
 * 특정 텍스트 입력을 통해 확인하는 다이얼로그 컴포넌트입니다.
 * 중요한 액션(예: 캘린더 삭제 등)에 대한 추가 확인을 위해 사용됩니다.
 */
export const TextConfirmDialog = ({
  children,
  title,
  description,
  expectedText,
  onConfirm,
  onOpenChange,
  isOpen,
}: TextConfirmDialogProps) => {
  const [inputValue, setInputValue] = useState("");

  const isConfirmEnabled = inputValue.trim() === expectedText;

  const handleConfirm = () => {
    if (isConfirmEnabled) {
      onConfirm();
      onOpenChange(false);
      setInputValue("");
    }
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setInputValue("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogDescription className="space-y-2">
            <div className="text-medium-r text-notification-medium">{description}</div>
            <div className="text-bold-m text-notification-strong">{expectedText}</div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Input
            value={inputValue}
            placeholder={expectedText}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={!isConfirmEnabled}>
            확인
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
