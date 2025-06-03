import type { Schedule } from "../model";

export type CreateScheduleRequest = Omit<Schedule, "id" | "calendar">;
