"use client";

import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputField } from "./custom-input";

interface DatePickerFieldProps {
  label: string;
  placeholder: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  showTimeOnly?: boolean;
  dateFormat?: string;
  error?: string;
  [key: string]: any;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  placeholder,
  selected,
  onChange,
  showTimeOnly = false,
  dateFormat = "dd/MM/yyyy",
  error,
  ...props
}) => {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");

  const CustomInput = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(({ ...r }, ref) => {
    return (
      <div className="relative">
        <InputField
          {...r}
          ref={ref}
          label={label}
          placeholder={placeholder}
          className="pe-10"
          id="s"
          type="text"
          autoComplete="off"
          readOnly
        ></InputField>
      </div>
    );
  });
  CustomInput.displayName = "CustomInput";

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
        calendarClassName="custom-date-picker"
        dateFormat={dateFormat}
        {...props}
        customInput={<CustomInput />}
        showYearDropdown
      />
      {error && <p className="mt-0.5 ml-1 text-sm text-primary">{error}</p>}
    </div>
  );
};
