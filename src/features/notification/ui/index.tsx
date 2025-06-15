import type { Notification } from "@/entities/notification";
import { Badge } from "@/shared/ui/badge";
import { useEffect, useState } from "react";
import { NotificationItem } from "./NotificationItem";

/**
 * 우측 사이드바에서 사용되는 알림 컴포넌트입니다.
 * 일정 알림, 캘린더 초대 알림 등을 표시하고 읽음 처리 및 삭제 기능을 제공합니다.
 */
export const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  useEffect(() => {
    // TODO: 알림 조회 API 호출
    setNotifications([
      {
        id: 123,
        type: "CALENDAR_INVITATION",
        title: "뼝뼝 님이 뿅뿅 캘린더에 초대했습니다.",
        data: {
          calendarId: 3,
        },
        isRead: false,
        createdAt: "2025-04-29T08:00:00Z",
      },
      {
        id: 124,
        type: "CALENDAR_INVITATION_ACCEPT",
        title: "뿅뿅님이 뿅뿅캘린더 초대를 수락했습니다",
        data: {},
        isRead: false,
        createdAt: "2025-04-28T12:30:00Z",
      },
    ]);
  }, []);

  return (
    <div className="w-full max-w-sm p-3">
      <div className="flex h-20 items-center gap-2 p-6">
        <h2 className="text-bold-l text-grayscale-black">알림</h2>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="rounded-[99px] px-2 text-medium-s">
            {unreadCount}
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};
