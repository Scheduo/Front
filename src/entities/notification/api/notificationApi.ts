import { axiosInstance } from "@/shared/api";

export const notificationApi = {
  getNotifications: async () => {
    const response = await axiosInstance.get("/notifications");
    return response.data.data;
  },

  deleteNotification: async (notificationId: string) =>
    await axiosInstance.delete(`/notifications/${notificationId}/read`),
};
