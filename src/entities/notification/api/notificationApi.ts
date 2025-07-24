import { axiosInstance } from "@/shared/api";
import type { GetNotificationsResponse } from "./types";

export const notificationApi = {
  getNotifications: async (): Promise<GetNotificationsResponse> => {
    const response = await axiosInstance.get("/notifications");
    return response.data.data;
  },

  deleteNotification: async (notificationId: number) =>
    await axiosInstance.delete(`/notifications/${notificationId}/read`),
};
