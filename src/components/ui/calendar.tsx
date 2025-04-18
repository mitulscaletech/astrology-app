"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
// import { buttonVariants } from "@/components/ui/button";
// import IconChevronLeft from "@/shared/icons/chevronLeft";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 z-10", className)}
      classNames={{
        months: "space-y-0",
        month: "text-center",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center justify-between",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-secondary-300 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary/50 [&:has([aria-selected])]:bg-primary first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_range_end: "day-range-end",
        day: "size-9 [&_button]:size-full p-0 aria-selected:opacity-100 hover:bg-secondary-100 hover:text-secondary rounded-full transition-colors duration-200 ease-in-out",
        selected:
          "!bg-primary hover:!bg-primary-700  !text-accent-white hover:!text-accent-white font-semibold rounded-full hover:bg-primary/90 transition-colors duration-200 ease-in-out",
        today: "bg-secondary hover:bg-secondary-700 text-accent-white hover:text-accent-white outline-0 rounded-full",
        disabled: "text-secondary-300 [&_button]:cursor-not-allowed",
        button: "opacity-0",
        // day: cn(
        //   // Base styles
        //   "h-9 w-9 p-0 aria-selected:opacity-100 rounded-full transition-colors duration-200 ease-in-out",
        //   // Hover state
        //   "hover:bg-secondary-100 hover:text-secondary",
        //   // If selected,
        //   "data-[selected='true']:bg-primary data-[selected='true']:hover:bg-primary-700 data-[selected='true']:text-accent-white data-[selected='true']:hover:text-accent-white",
        //   // If today,
        //   "data-[today='true']:bg-secondary data-[today='true']:hover:bg-secondary-700 data-[today='true']:text-accent-white data-[today='true']:hover:text-accent-white"
        // ),
        day_outside:
          "day-outside text-secondary-300 opacity-50 aria-selected:bg-primary/50 aria-selected:text-secondary-300 aria-selected:opacity-30",
        day_disabled: "text-secondary-300 opacity-50",
        day_range_middle: "aria-selected:bg-primary aria-selected:text-secondary",
        day_hidden: "invisible",
        ...classNames
      }}
      // modifiersClassNames={{
      //   selected:
      //     "!bg-primary hover:!bg-primary-700  !text-accent-white hover:!text-accent-white font-semibold rounded-full hover:bg-primary/90 transition-colors duration-200 ease-in-out",
      //   today: "bg-secondary hover:bg-secondary-700 text-accent-white hover:text-accent-white outline-0 rounded-full"
      // }}
      // components={{
      //   IconLeft: () => (
      //     <span className="h-4 w-4">
      //       <IconChevronLeft />
      //     </span>
      //   ),
      //   IconRight: () => (
      //     <span className="h-4 w-4">
      //       <IconChevronLeft />
      //     </span>
      //   )
      // }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
