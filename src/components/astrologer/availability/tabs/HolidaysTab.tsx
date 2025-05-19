"use client";

import { useState } from "react";
import { format, addMonths, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TimePicker } from "../TimePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "../Calendar";

type Holiday = {
  name: string;
  date: Date;
  enabled: boolean;
};

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
};

export default function HolidaysTab() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timezone, setTimezone] = useState("India (GMT)");
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
    startTime: "01:00 AM",
    endTime: "01:00 AM"
  });
  const [isAllDay, setIsAllDay] = useState(false);
  const [publicHolidays, setPublicHolidays] = useState<Holiday[]>([
    { name: "New Year", date: new Date(2026, 0, 1), enabled: true },
    { name: "Good Friday", date: new Date(2026, 3, 3), enabled: true },
    { name: "Easter Monday", date: new Date(2026, 3, 6), enabled: true },
    { name: "Labor Day", date: new Date(2025, 4, 5), enabled: true },
    { name: "Memorial Day", date: new Date(2025, 4, 26), enabled: false },
    { name: "Independence Day", date: new Date(2025, 7, 25), enabled: true }
  ]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const toggleHoliday = (index: number) => {
    const updatedHolidays = [...publicHolidays];
    updatedHolidays[index].enabled = !updatedHolidays[index].enabled;
    setPublicHolidays(updatedHolidays);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">Plan Your Time Off</h2>
            <p className="text-muted-foreground">
              Everyone needs a break. Set your upcoming holidays so you won&apos;t receive bookings during those days.
              You can always update or remove these later.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button className="p-2 hover:bg-muted rounded-full transition-colors" onClick={handlePrevMonth}>
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-2">
                  <select
                    className="bg-transparent text-sm font-medium focus:outline-none"
                    value={format(currentMonth, "MMMM")}
                  >
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ].map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    className="bg-transparent text-sm font-medium focus:outline-none"
                    value={format(currentMonth, "yyyy")}
                  >
                    {[2024, 2025, 2026].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="p-2 hover:bg-muted rounded-full transition-colors" onClick={handleNextMonth}>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="bg-white rounded-lg border border-primary/5">
                <div className="grid grid-cols-7 gap-px text-center p-4">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div key={i} className="text-xs font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                <Calendar
                  value={selectedRange.startDate}
                  onChange={(date) => setSelectedRange((prev) => ({ ...prev, startDate: date }))}
                  currentMonth={currentMonth}
                  unavailableDates={[]}
                />
              </div>
            </div>

            {/* Date Selection Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">From</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-muted rounded-md px-3 py-2 text-sm">
                        {selectedRange.startDate ? format(selectedRange.startDate, "d MMMM yyyy") : "Select date"}
                      </div>
                      <TimePicker
                        value={selectedRange.startTime}
                        onChange={(time) => setSelectedRange((prev) => ({ ...prev, startTime: time }))}
                      />
                      <button className="p-2 hover:bg-muted rounded-full">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">to</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-muted rounded-md px-3 py-2 text-sm">
                        {selectedRange.endDate ? format(selectedRange.endDate, "d MMMM yyyy") : "Select date"}
                      </div>
                      <TimePicker
                        value={selectedRange.endTime}
                        onChange={(time) => setSelectedRange((prev) => ({ ...prev, endTime: time }))}
                      />
                      <button className="p-2 hover:bg-muted rounded-full">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <Switch checked={isAllDay} onCheckedChange={setIsAllDay} />
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
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

          <div className="mt-12 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Public Holidays</h2>
              <p className="text-muted-foreground">
                Your availability will be automatically blocked for national holidays, based on the Indian time zone,
                across all session types.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {publicHolidays.map((holiday, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-primary/5 rounded-md">
                  <div className="flex-1">
                    <div className="font-medium">{holiday.name}</div>
                    <div className="text-sm text-muted-foreground">{format(holiday.date, "d MMM yyyy")}</div>
                  </div>
                  <Switch checked={holiday.enabled} onCheckedChange={() => toggleHoliday(index)} />
                </div>
              ))}
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
