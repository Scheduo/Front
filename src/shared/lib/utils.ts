import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { CalendarCategoryColor } from "@/entities/schedule";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // 텍스트 색상
      "text-color": [
        // grayscale
        "text-grayscale-white",
        "text-grayscale-100",
        "text-grayscale-200",
        "text-grayscale-300",
        "text-grayscale-400",
        "text-grayscale-500",
        "text-grayscale-700",
        "text-grayscale-black",

        // primary (blue)
        "text-primary-main",
        "text-primary-light",
        "text-primary-dark",

        // notification (red)
        "text-notification-strong",
        "text-notification-medium",
        "text-notification-light",

        // category colors
        "text-category-red",
        "text-category-orange",
        "text-category-amber",
        "text-category-green",
        "text-category-teal",
        "text-category-cyan",
        "text-category-purple",
        "text-category-pink",
        "text-category-gray",
      ],

      // 배경 색상
      "bg-color": [
        // grayscale
        "bg-grayscale-white",
        "bg-grayscale-100",
        "bg-grayscale-200",
        "bg-grayscale-300",
        "bg-grayscale-400",
        "bg-grayscale-500",
        "bg-grayscale-700",
        "bg-grayscale-black",

        // primary (blue)
        "bg-primary-main",
        "bg-primary-light",
        "bg-primary-dark",

        // notification (red)
        "bg-notification-strong",
        "bg-notification-medium",
        "bg-notification-light",

        // category colors
        "bg-category-red",
        "bg-category-orange",
        "bg-category-amber",
        "bg-category-green",
        "bg-category-teal",
        "bg-category-cyan",
        "bg-category-purple",
        "bg-category-pink",
        "bg-category-gray",
      ],

      // 경계선 색상
      "border-color": [
        "border-grayscale-white",
        "border-grayscale-100",
        "border-grayscale-200",
        "border-grayscale-300",
        "border-grayscale-400",
        "border-grayscale-500",
        "border-grayscale-700",
        "border-grayscale-black",
        "border-primary-main",
        "border-primary-light",
        "border-primary-dark",
        "border-notification-strong",
        "border-notification-medium",
        "border-notification-light",
      ],

      // 커스텀 타이포그래피
      "font-size": [
        "text-bold-l",
        "text-bold-m",
        "text-bold-r",
        "text-bold-s",
        "text-medium-m",
        "text-medium-r",
        "text-medium-s",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
