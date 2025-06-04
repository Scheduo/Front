import type { CalendarRole } from "@/entities/calendar";

export const ROLE_OPTIONS = [
  { label: "owner", value: "OWNER" as CalendarRole },
  { label: "can view", value: "VIEWER" as CalendarRole },
  { label: "can edit", value: "EDITOR" as CalendarRole },
];
