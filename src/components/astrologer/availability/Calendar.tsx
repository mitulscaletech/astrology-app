"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  getDay
} from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarProps {
  value: Date | null;
  onChange: (date: Date) => void;
  currentMonth: Date;
  unavailableDates?: Date[];
}

export function Calendar({ value, onChange, currentMonth, unavailableDates = [] }: CalendarProps) {
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  useEffect(() => {
    // Get start and end of the month
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);

    // Get start and end of the calendar view (including days from prev/next months)
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    // Generate array of dates
    const days: Date[] = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    setCalendarDays(days);
  }, [currentMonth]);

  const isUnavailable = (date: Date): boolean => {
    return unavailableDates.some((unavailableDate) => isSameDay(date, unavailableDate));
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {calendarDays.map((day, i) => {
        const isCurrentMonth = isSameMonth(day, currentMonth);
        const isSelected = value ? isSameDay(day, value) : false;
        const isUnavailableDay = isUnavailable(day);

        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(day)}
            className={cn(
              "aspect-square flex items-center justify-center text-sm rounded-full",
              "transition-colors duration-200",
              isCurrentMonth ? "text-foreground" : "text-muted-foreground opacity-50",
              isSelected && isCurrentMonth && !isUnavailableDay && "bg-primary text-primary-foreground",
              isUnavailableDay && isCurrentMonth && "bg-destructive text-destructive-foreground",
              !isSelected && !isUnavailableDay && isCurrentMonth && "hover:bg-muted",
              !isCurrentMonth && "cursor-default"
            )}
            disabled={!isCurrentMonth}
          >
            {format(day, "d")}
          </button>
        );
      })}
    </div>
  );
}
