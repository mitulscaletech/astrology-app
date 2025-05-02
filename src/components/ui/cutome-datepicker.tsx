"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps {
  label: string;
  placeholder: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  showTimeOnly?: boolean;
  dateFormat?: string;
  error?: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  placeholder,
  selected,
  onChange,
  showTimeOnly = false,
  dateFormat = "dd/MM/yyyy",
  error
}) => {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");
  const hasValue = !!selected;

  return (
    <div className="relative w-full">
      <DatePicker
        id={inputId}
        selected={selected}
        onChange={(date) => onChange(date)}
        showTimeSelect={showTimeOnly}
        showTimeSelectOnly={showTimeOnly}
        timeIntervals={15}
        timeCaption="Time"
        dateFormat={dateFormat}
        // placeholderText={placeholder}
        className={cn(
          "peer h-14 w-full rounded-md border-2 border-secondary/30 px-3 pt-5 text-base text-secondary-800 transition-all",
          "focus:border-secondary/50 focus:outline-none focus:ring-1 focus:ring-secondary/40",
          error && "border-primary"
        )}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "absolute left-3 transition-all text-sm text-secondary/50 pointer-events-none",
          hasValue ? "top-3 text-xs text-secondary/70" : "top-[18px] text-base text-secondary/40"
        )}
      >
        {label}
      </label>
      {error && <p className="mt-0.5 ml-1 text-sm text-primary">{error}</p>}
    </div>
  );
};
