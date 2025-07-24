import type { NotificationType } from "@/entities/notification";

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  CALENDAR_INVITATION: "캘린더 초대",
  CALENDAR_INVITATION_ACCEPT: "초대 수락",
  SCHEDULE_REMINDER: "일정 알림",
} as const;
