export type NotificationType = "CALENDAR_INVITATION" | "CALENDAR_INVITATION_ACCEPT" | "SCHEDULE_REMINDER";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  data: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}
