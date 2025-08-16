export const calendarKeys = {
  all: ["calendars"] as const,
  lists: () => [...calendarKeys.all, "list"] as const,
  list: () => [...calendarKeys.lists()] as const,
  details: () => [...calendarKeys.all, "detail"] as const,
  detail: (id: number) => [...calendarKeys.details(), id] as const,
  invites: () => [...calendarKeys.all, "invite"] as const,
  invite: (id: number) => [...calendarKeys.invites(), id] as const,
} as const;
