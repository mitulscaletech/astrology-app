"use client";

import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/scss/datepicker.scss";
import IconChevronLeft from "@/shared/icons/chevronLeft";
import IconChevronRight from "@/shared/icons/chevronRight";
interface CalendarProps {
  value: Date | null;
  onChange: (_date: Date) => void;
  unavailableDates?: Date[];
  minYear?: number;
}

export function Calendar({ value, onChange, unavailableDates = [], minYear = 2020 }: CalendarProps) {
  // Convert unavailableDates to moment objects for comparison
  const highlightDates = unavailableDates.map((d) => moment(d).toDate());

  return (
    <DatePicker
      selected={value}
      onChange={(date) => date && onChange(date as Date)}
      inline
      highlightDates={highlightDates}
      calendarClassName="custom-date-picker astrologer-date-picker"
      minDate={moment(`${minYear}-01-01`).toDate()}
      showMonthDropdown
      showYearDropdown
      dayClassName={(date) => {
        const isUnavailable = highlightDates.some((d) => moment(d).isSame(date, "day"));
        return isUnavailable ? "bg-primary/10 text-primary" : "";
      }}
    />
  );
}
