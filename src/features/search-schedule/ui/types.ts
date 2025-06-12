export interface SearchResultItem {
  scheduleId: number;
  calendarId: number;
  calendarName: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export type ViewType = "RECENT" | "RESULT";
