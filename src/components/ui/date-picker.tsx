// DatePicker.tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the necessary styles
import { Input } from "./input";
import IconCalender from "@/shared/icons/calender";

type DatePickerProps = {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
};

const DatePickerComponent = ({ selectedDate, onChange }: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(selectedDate || null);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    onChange(date); // Update parent component's state
  };

  return (
    <div className="relative">
      {/* DatePicker Input */}
      <DatePicker
        showIcon
        selected={startDate}
        onChange={handleDateChange}
        showYearDropdown
        dateFormat="dd/MM/yyyy"
        scrollableYearDropdown
        yearDropdownItemNumber={50} // Optional: How many years to show in the dropdown
        placeholderText="Select Date of Birth"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" // Custom styles
        icon={
          <span className="size-8 p-1 absolute top-1/2 -translate-y-1/2 right-2">
            <IconCalender />
          </span>
        }
        customInput={
          <Input className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        }
      />
    </div>
  );
};

export default DatePickerComponent;
