import type { Schedule } from "../model";

export type InputScheduleRequest = Omit<Schedule, "id" | "calendar">;
