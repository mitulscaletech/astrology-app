"use client";

import React from "react";
import { Views } from "react-big-calendar";
import { format, addMonths, subMonths } from "date-fns";

import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import IconChevronLeft from "@/shared/icons/chevronLeft";
import IconChevronRight from "@/shared/icons/chevronRight";

interface CustomHeaderProps {
  date: Date;
  view: string;
  onNavigate: (newDate: Date) => void;
  onViewChange: (view: string) => void;
}

const viewOptions = [
  { value: Views.MONTH, label: "Month" },
  { value: Views.WEEK, label: "Week" },
  { value: Views.DAY, label: "Day" },
  { value: Views.AGENDA, label: "Agenda" }
];

const CustomHeader: React.FC<CustomHeaderProps> = ({ date, view, onNavigate, onViewChange }) => {
  // Generate months for the dropdown
  const generateMonthOptions = () => {
    const options = [];
    for (let i = -6; i <= 6; i++) {
      const monthDate = i === 0 ? date : i < 0 ? subMonths(date, Math.abs(i)) : addMonths(date, i);
      options.push({
        value: format(monthDate, "yyyy-MM"),
        label: format(monthDate, "MMMM yyyy")
      });
    }
    return options;
  };

  const monthOptions = generateMonthOptions();

  // Handle month selection change
  const handleMonthChange = (selected: any) => {
    if (selected) {
      const [year, month] = selected.value.split("-");
      const newDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      onNavigate(newDate);
    }
  };

  // Handle view selection change
  const handleViewChange = (selected: any) => {
    if (selected) {
      onViewChange(selected.value);
    }
  };

  // Navigation handlers
  const navigateToday = () => onNavigate(new Date());
  const navigatePrev = () => onNavigate(subMonths(date, 1));
  const navigateNext = () => onNavigate(addMonths(date, 1));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 lg:mb-5 2xl:mb-6">
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="sm" onClick={navigateToday} className="hidden">
          Today
        </Button>
        <div className="w-40">
          <CustomSelect
            value={viewOptions.find((option) => option.value === view)}
            options={viewOptions}
            onChange={handleViewChange}
            isMulti={false}
            isFloatingLabel={false}
          />
        </div>
        <button
          onClick={navigatePrev}
          className="size-16 items-center justify-center flex rounded-md border-2 border-secondary/30"
        >
          <span className="size-4 lg:size-5 text-secondary">
            <IconChevronLeft />
          </span>
        </button>
        <button
          onClick={navigateNext}
          className="size-16 items-center justify-center flex rounded-md border-2 border-secondary/30"
        >
          <span className="size-4 lg:size-5 text-secondary">
            <IconChevronRight />
          </span>
        </button>
        <div className="w-44">
          <CustomSelect
            value={monthOptions.find((option) => option.value === format(date, "yyyy-MM"))}
            options={monthOptions}
            onChange={handleMonthChange}
            isMulti={false}
            isFloatingLabel={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
