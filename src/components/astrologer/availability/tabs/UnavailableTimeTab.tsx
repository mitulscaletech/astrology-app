"use client";

import { useState } from "react";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar } from "../Calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import IconClose from "@/shared/icons/close";
import CustomSelect from "@/components/ui/custom-select";
import IconDuplicate from "@/shared/icons/duplicate";
import IconTimezone from "@/shared/icons/timezone";

type UnavailableDate = {
  date: Date;
  allDay: boolean;
  timeRanges: {
    from: string;
    to: string;
  }[];
};

const timeOptions = [
  "7:30 AM",
  "7:45 AM",
  "8:00 AM",
  "8:15 AM",
  "8:30 AM",
  "8:45 AM",
  "9:00 AM",
  "9:15 AM",
  "9:30 AM",
  "9:45 AM",
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "11:00 AM",
  "11:15 AM",
  "11:30 AM",
  "11:45 AM",
  "12:00 PM",
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "1:00 PM",
  "1:15 PM",
  "1:30 PM",
  "1:45 PM",
  "2:00 PM",
  "2:15 PM",
  "2:30 PM",
  "2:45 PM",
  "3:00 PM",
  "3:15 PM",
  "3:30 PM",
  "3:45 PM",
  "4:00 PM",
  "4:15 PM",
  "4:30 PM",
  "4:45 PM",
  "5:00 PM",
  "5:15 PM",
  "5:30 PM",
  "5:45 PM",
  "6:00 PM",
  "6:15 PM",
  "6:30 PM",
  "6:45 PM",
  "7:00 PM",
  "7:15 PM",
  "7:30 PM",
  "7:45 PM",
  "8:00 PM",
  "8:15 PM",
  "8:30 PM",
  "8:45 PM",
  "9:00 PM",
  "9:15 PM",
  "9:30 PM",
  "9:45 PM",
  "10:00 PM",
  "10:15 PM",
  "10:30 PM",
  "10:45 PM",
  "11:00 PM",
  "11:15 PM",
  "11:30 PM",
  "11:45 PM"
];
const timeSelectOptions = timeOptions.map((t) => ({ value: t, label: t }));

export default function UnavailableTimeTab() {
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

  return (
    <div className="flex-1">
      <div className="mb-6">
        <div className="mb-3 md:mb-4 xl:mb-5 2xl:mb-6 4xl:mb-8">
          <Typography variant="h4" size="h5" className="font-bold mb-1">
            Set Unavailable Hours
          </Typography>
          <p>Choose the specific dates and times you won&apos;t be available for sessions.</p>
        </div>
        <div className="4xl:w-11/12">
          <Grid className="" size="lg">
            <Grid.Col className="md:w-6/12">
              <div className="">
                <Calendar
                  value={selectedDate}
                  onChange={handleDateSelect}
                  unavailableDates={unavailableDates.map((item) => item.date)}
                  minYear={2025}
                />
              </div>
            </Grid.Col>
            <Grid.Col className="md:w-6/12">
              <div>
                <div className="mb-6">
                  <Typography variant="h4" size="h5" className="font-bold mb-1 md:mb-2">
                    Date-specific hours
                  </Typography>
                  <p className="">
                    You can block an entire day or set custom hours.
                    <b>This ensures clients only book when you&apos;re truly available.</b>
                  </p>
                </div>

                {selectedDate && (
                  <div className="">
                    <div className="flex items-center justify-between mb-1.5 xl:mb-2">
                      <Typography variant="h4" size="base" className="text-primary font-medium">
                        {format(selectedDate, "MMM d, yyyy")}
                      </Typography>
                      <Switch checked={isAllDay} onCheckedChange={toggleAllDay} />
                    </div>
                    <div className="">
                      {isAllDay && (
                        <div className="bg-secondary/10 text-secondary py-2 lg:py-3 px-2 lg:px-3 2xl:px-4 rounded-md inline-flex font-medium">
                          Unavailable All day
                        </div>
                      )}

                      {!isAllDay && (
                        <div>
                          <p className="text-secondary/50 mb-2 font-medium">Unavailable From</p>
                          <div className="flex justify-between">
                            <div className="flex flex-wrap items-center gap-2 md:gap-3 xl:gap-4">
                              <CustomSelect
                                value={timeSelectOptions.find((opt) => opt.value === timeRange.from) || null}
                                onChange={(option) => {
                                  const selected = Array.isArray(option) ? option[0] : option;
                                  updateTimeRange("from", (selected as { value: string; label: string })?.value || "");
                                }}
                                options={timeSelectOptions}
                                isMulti={false}
                                parentClass="w-28 text-center"
                                placeholder="Select time"
                                isFloatingLabel={false}
                                size="sm"
                                variant="secondary-10"
                                hideDropdownIndicator={true}
                              />
                              <span className="font-medium">to</span>
                              <CustomSelect
                                value={timeSelectOptions.find((opt) => opt.value === timeRange.to) || null}
                                onChange={(option) => {
                                  const selected = Array.isArray(option) ? option[0] : option;
                                  updateTimeRange("to", (selected as { value: string; label: string })?.value || "");
                                }}
                                options={timeSelectOptions}
                                isMulti={false}
                                parentClass="w-28 text-center"
                                placeholder="Select time"
                                isFloatingLabel={false}
                                size="sm"
                                variant="secondary-10"
                                hideDropdownIndicator={true}
                              />
                            </div>
                            <div className="flex items-center gap-2 lg:gap-3">
                              <button className="size-12 inline-flex rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                                <span className="w-1/2 aspect-square m-auto">
                                  <IconClose />
                                </span>
                              </button>
                              <button className="size-12 inline-flex rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20">
                                <span className="w-1/2 aspect-square m-auto">
                                  <IconDuplicate />
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-3 md:mt-4 xl:mt-5 2xl:mt-6 4xl:mt-8 text-secondary/70">
                  <span className="size-5 xl:size-6 ">
                    <IconTimezone />
                  </span>
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
            </Grid.Col>
          </Grid>
        </div>
      </div>
      <div className="border-t border-primary/5 p-4 sticky bottom-0 bg-background text-end z-2 bg-accent-white/10 backdrop-blur-sm">
        <Button variant="highlight">SAVE</Button>
      </div>
    </div>
  );
}
