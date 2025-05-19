"use client";

import { useState } from "react";
import { format, addMonths } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar } from "../Calendar";
import { TimePicker } from "../TimePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UnavailableDate = {
  date: Date;
  allDay: boolean;
  timeRanges: {
    from: string;
    to: string;
  }[];
};

export default function UnavailableTimeTab() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timezone, setTimezone] = useState("India (GMT)");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDate[]>([
    {
      date: new Date(2025, 3, 4), // April 4, 2025
      allDay: false,
      timeRanges: [{ from: "9:00 AM", to: "12:00 PM" }]
    }
  ]);

  const [isAllDay, setIsAllDay] = useState(false);
  const [timeRange, setTimeRange] = useState({ from: "9:00 AM", to: "12:00 PM" });

  const dateToString = (date: Date) => {
    return format(date, "MMM d, yyyy");
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Check if this date is already marked as unavailable
    const existingDateIndex = unavailableDates.findIndex(
      (item) => format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

    if (existingDateIndex !== -1) {
      const existingDate = unavailableDates[existingDateIndex];
      setIsAllDay(existingDate.allDay);
      if (existingDate.timeRanges.length > 0) {
        setTimeRange(existingDate.timeRanges[0]);
      }
    } else {
      setIsAllDay(false);
      setTimeRange({ from: "9:00 AM", to: "12:00 PM" });
    }
  };

  const toggleDateAvailability = () => {
    if (!selectedDate) return;

    const existingDateIndex = unavailableDates.findIndex(
      (item) => format(item.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    );

    if (existingDateIndex !== -1) {
      // Remove the date if it exists
      const updatedDates = [...unavailableDates];
      updatedDates.splice(existingDateIndex, 1);
      setUnavailableDates(updatedDates);
    } else {
      // Add the date if it doesn't exist
      setUnavailableDates([
        ...unavailableDates,
        {
          date: selectedDate,
          allDay: isAllDay,
          timeRanges: isAllDay ? [] : [timeRange]
        }
      ]);
    }
  };

  const updateTimeRange = (field: "from" | "to", value: string) => {
    setTimeRange((prev) => ({
      ...prev,
      [field]: value
    }));

    // Update the unavailable date if it already exists
    if (selectedDate) {
      const existingDateIndex = unavailableDates.findIndex(
        (item) => format(item.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      );

      if (existingDateIndex !== -1) {
        const updatedDates = [...unavailableDates];
        if (updatedDates[existingDateIndex].timeRanges.length > 0) {
          updatedDates[existingDateIndex].timeRanges[0] = {
            ...updatedDates[existingDateIndex].timeRanges[0],
            [field]: value
          };
        } else {
          updatedDates[existingDateIndex].timeRanges = [{ ...timeRange, [field]: value }];
        }
        setUnavailableDates(updatedDates);
      }
    }
  };

  const toggleAllDay = () => {
    const newAllDayValue = !isAllDay;
    setIsAllDay(newAllDayValue);

    // Update the unavailable date if it already exists
    if (selectedDate) {
      const existingDateIndex = unavailableDates.findIndex(
        (item) => format(item.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      );

      if (existingDateIndex !== -1) {
        const updatedDates = [...unavailableDates];
        updatedDates[existingDateIndex].allDay = newAllDayValue;
        if (newAllDayValue) {
          updatedDates[existingDateIndex].timeRanges = [];
        } else if (updatedDates[existingDateIndex].timeRanges.length === 0) {
          updatedDates[existingDateIndex].timeRanges = [timeRange];
        }
        setUnavailableDates(updatedDates);
      }
    }
  };

  const isDateUnavailable = (date: Date): boolean => {
    return unavailableDates.some((item) => format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"));
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6">
        <div className="space-y-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Set Unavailable Hours</h2>
            <p className="text-muted-foreground">
              Choose the specific dates and times you won&apos;t be available for sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-primary/5">
              <div className="p-4 flex items-center justify-between border-b border-primary/5">
                <button className="p-2 hover:bg-muted rounded-full transition-colors" onClick={handlePrevMonth}>
                  <ChevronLeft size={16} />
                </button>
                <span className="font-medium">
                  {format(currentMonth, "MMMM")}
                  <select
                    className="mx-2 bg-transparent border-none outline-none"
                    value={format(currentMonth, "yyyy")}
                    onChange={(e) => {
                      const newDate = new Date(currentMonth);
                      newDate.setFullYear(parseInt(e.target.value));
                      setCurrentMonth(newDate);
                    }}
                  >
                    {[2025, 2026, 2027, 2028].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </span>
                <button className="p-2 hover:bg-muted rounded-full transition-colors" onClick={handleNextMonth}>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="p-3">
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                    <div key={day} className="text-xs text-muted-foreground font-medium py-1">
                      {day}
                    </div>
                  ))}
                </div>

                <Calendar
                  value={selectedDate}
                  onChange={handleDateSelect}
                  currentMonth={currentMonth}
                  unavailableDates={unavailableDates.map((item) => item.date)}
                />
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Date-specific hours</h3>
                <p className="text-muted-foreground text-sm">
                  You can block an entire day or set custom hours. This ensures clients only book when you&apos;re truly
                  available.
                </p>
              </div>

              {selectedDate && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{format(selectedDate, "MMM d, yyyy")}</span>
                    <Switch checked={isDateUnavailable(selectedDate)} onCheckedChange={toggleDateAvailability} />
                  </div>

                  {isDateUnavailable(selectedDate) && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Unavailable All day</span>
                        <Switch checked={isAllDay} onCheckedChange={toggleAllDay} />
                      </div>

                      {!isAllDay && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-muted-foreground mr-1">Unavailable From</span>
                          <TimePicker value={timeRange.from} onChange={(value) => updateTimeRange("from", value)} />
                          <span className="mx-2">to</span>
                          <TimePicker value={timeRange.to} onChange={(value) => updateTimeRange("to", value)} />
                          <button className="ml-2 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                            <X size={16} className="text-foreground" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 mt-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 12H2M12 2.5V1M20.5 12H22M12 21.5V23"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-muted-foreground text-sm">Timezone:</span>
                <div className="w-56">
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue>{timezone}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India (GMT)">India (GMT)</SelectItem>
                      <SelectItem value="Pacific Time (PT)">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Eastern Time (ET)">Eastern Time (ET)</SelectItem>
                      <SelectItem value="Central European Time (CET)">Central European Time (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/5 p-4 sticky bottom-0 bg-background">
        <Button>SAVE</Button>
      </div>
    </div>
  );
}
