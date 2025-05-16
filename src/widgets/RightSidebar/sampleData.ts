import type { ScheduleItem } from "./types";

export const defaultSchedules: ScheduleItem[] = [
  {
    id: "1",
    title: "회의",
    time: "23:00~11:00",
    location: "회의실 A",
    typeName: "회사",
  },
  {
    id: "2",
    title: "약속",
    time: "13:00~14:00",
    location: "",
    typeName: "약속",
  },
  {
    id: "3",
    title: "어쩌구저쩌구 프로젝트입니다 으와앙",
    time: "15:00~24:00",
    location: "study",
    typeName: "회사",
  },
];
