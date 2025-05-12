import type { Event } from "./index";

export const sampleEvents: Event[] = [
  {
    id: "1",
    title: "프로젝트 마감일",
    startDate: new Date(2025, 3, 21), // 2025년 1월 21일
    endDate: new Date(2025, 3, 21),
    color: "bg-category-gray",
  },
  {
    id: "2",
    title: "회의",
    startDate: new Date(2025, 4, 15),
    endDate: new Date(2025, 4, 15),
    color: "bg-category-cyan",
  },
  {
    id: "3",
    title: "약속",
    startDate: new Date(2025, 4, 15),
    endDate: new Date(2025, 4, 15),
    color: "bg-category-pink",
  },
  {
    id: "4",
    title: "어쩌구 저쩌구 프로젝트 마감",
    startDate: new Date(2025, 4, 15),
    endDate: new Date(2025, 4, 15),
    color: "bg-category-teal",
  },
  {
    id: "5",
    title: "약속",
    startDate: new Date(2025, 4, 15),
    endDate: new Date(2025, 4, 15),
    color: "bg-category-pink",
  },
  {
    id: "6",
    title: "마감",
    startDate: new Date(2025, 4, 15),
    endDate: new Date(2025, 4, 15),
    color: "bg-category-teal",
  },
  {
    id: "7",
    title: "출장",
    startDate: new Date(2025, 4, 19),
    endDate: new Date(2025, 4, 23),
    color: "bg-category-gray",
  },
  {
    id: "8",
    title: "휴가",
    startDate: new Date(2025, 4, 25),
    endDate: new Date(2025, 4, 25),
    color: "bg-category-amber",
  },
];
