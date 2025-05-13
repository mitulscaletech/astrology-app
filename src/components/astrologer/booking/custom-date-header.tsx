"use client";

import { HeaderProps } from "react-big-calendar";
import moment from "moment";

export default function CustomDateHeader({ date }: HeaderProps) {
  const now = typeof window !== "undefined" ? new Date() : null;
  const isToday = now ? moment(date).isSame(now, "day") : false;

  return (
    <span
      className={`flex flex-col items-center justify-center w-full
        ${isToday ? "text-accent-white" : "text-primary"}`}
    >
      <span className={`text-lg leading-5 font-semibold ${isToday ? " text-accent-white" : "text-secondary"}`}>
        {moment(date).format("D")}
      </span>
      <span className={`text-xs  ${isToday ? " text-accent-white" : "text-secondary/50"}`}>
        {moment(date).format("ddd")}
      </span>
    </span>
  );
}
