import type { Notification } from "@/entities/notification";
import { X } from "lucide-react";
import { NOTIFICATION_TYPE_LABELS } from "../consts";
import { getRelativeTime } from "../lib";

interface NotificationItemProps {
  notification: Notification;
  onDelete: (id: number) => void;
}

export const NotificationItem = ({ notification, onDelete }: NotificationItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest('[data-action="delete"]')) {
      e.stopPropagation();
      onDelete(notification.id);
      return;
    }
  };

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer flex-col gap-2 rounded-lg border p-3 text-left transition-colors hover:bg-grayscale-100 hover:shadow-sm"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-bold-m text-grayscale-black">{NOTIFICATION_TYPE_LABELS[notification.type]} 알림</span>
        <div className="flex items-center">
          <span className="text-grayscale-500 text-medium-s">{getRelativeTime(notification.createdAt)}</span>
          <span
            data-action="delete"
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded text-grayscale-500 hover:text-grayscale-black"
            aria-label="알림 삭제"
          >
            <X className="h-4 w-4" />
          </span>
        </div>
      </div>
      <p className="text-grayscale-700 text-medium-s">{notification.message}</p>
    </button>
  );
};
