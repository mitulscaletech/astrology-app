"use client";

import React, { useState } from "react";

import { Switch } from "@/components/ui/switch";
import CustomSelect from "@/components/ui/custom-select";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Typography from "@/components/ui/typography";
import IconTimezone from "@/shared/icons/timezone";
import IconClose from "@/shared/icons/close";
import IconEdit from "@/shared/icons/edit";
import IconDuplicate from "@/shared/icons/duplicate";

type TimeRange = {
  from: string;
  to: string;
};

type DaySchedule = {
  enabled: boolean;
  timeRanges: TimeRange[];
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

export default function AvailableTimeTab() {
  const [weekSchedule, setWeekSchedule] = useState<Record<string, DaySchedule>>({
    monday: { enabled: true, timeRanges: [{ from: "9:00 AM", to: "12:00 PM" }] },
    tuesday: {
      enabled: true,
      timeRanges: [
        { from: "9:00 AM", to: "12:00 PM" },
        { from: "2:00 PM", to: "6:00 PM" }
      ]
    },
    wednesday: {
      enabled: true,
      timeRanges: [
        { from: "9:00 AM", to: "12:00 PM" },
        { from: "2:00 PM", to: "6:00 PM" }
      ]
    },
    thursday: {
      enabled: true,
      timeRanges: [
        { from: "9:00 AM", to: "12:00 PM" },
        { from: "2:00 PM", to: "6:00 PM" }
      ]
    },
    friday: {
      enabled: true,
      timeRanges: [
        { from: "9:00 AM", to: "12:00 PM" },
        { from: "2:00 PM", to: "6:00 PM" }
      ]
    },
    saturday: { enabled: false, timeRanges: [] },
    sunday: { enabled: false, timeRanges: [] }
  });

  const [timezone, setTimezone] = useState("India (GMT)");

  const toggleDayAvailability = (day: string) => {
    setWeekSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };

  const updateTimeRange = (day: string, index: number, field: "from" | "to", value: string) => {
    setWeekSchedule((prev) => {
      const newTimeRanges = [...prev[day].timeRanges];
      newTimeRanges[index] = {
        ...newTimeRanges[index],
        [field]: value
      };
      return {
        ...prev,
        [day]: {
          ...prev[day],
          timeRanges: newTimeRanges
        }
      };
    });
  };

  const addTimeRange = (day: string) => {
    setWeekSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeRanges: [...prev[day].timeRanges, { from: "9:00 AM", to: "12:00 PM" }]
      }
    }));
  };

  const removeTimeRange = (day: string, index: number) => {
    setWeekSchedule((prev) => {
      const newTimeRanges = [...prev[day].timeRanges];
      newTimeRanges.splice(index, 1);
      return {
        ...prev,
        [day]: {
          ...prev[day],
          timeRanges: newTimeRanges
        }
      };
    });
  };

  const formatDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-6 mb-6">
        <div>
          <Typography variant="h4" size="h5" className="font-bold mb-1">
            Weekly hours
          </Typography>
          <p className="">Set when you are typically available</p>
        </div>

        <div className="space-y-6">
          {Object.entries(weekSchedule).map(([day, schedule]) => (
            <div key={day} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{formatDayName(day)}</h3>
              </div>

              <div className="flex items-center">
                <div className="w-8/12">
                  {schedule.enabled ? (
                    <div className="flex items-center gap-4 lg:gap-6 4xl:gap-8">
                      {schedule.timeRanges.map((timeRange, index) => (
                        <React.Fragment key={index}>
                          <div className="flex flex-wrap items-center gap-2 md:gap-3 xl:gap-4 2xl:gap-5">
                            <CustomSelect
                              value={timeSelectOptions.find((opt) => opt.value === timeRange.from) || null}
                              onChange={(option) => {
                                const selected = Array.isArray(option) ? option[0] : option;
                                updateTimeRange(
                                  day,
                                  index,
                                  "from",
                                  (selected as { value: string; label: string })?.value || ""
                                );
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
                            <span className="text-foreground">to</span>
                            <CustomSelect
                              value={timeSelectOptions.find((opt) => opt.value === timeRange.to) || null}
                              onChange={(option) => {
                                const selected = Array.isArray(option) ? option[0] : option;
                                updateTimeRange(
                                  day,
                                  index,
                                  "to",
                                  (selected as { value: string; label: string })?.value || ""
                                );
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
                          <div className="w-0.5 h-8 xl:h-10 bg-secondary/10 last:hidden"></div>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-secondary/10 text-secondary py-2 lg:py-3 px-2 lg:px-3 2xl:px-4 font-medium rounded-md inline-flex">
                      Unavailable
                    </div>
                  )}
                </div>
                <Switch checked={schedule.enabled} onCheckedChange={() => toggleDayAvailability(day)} />

                <div className="ms-auto flex gap-2">
                  {schedule.timeRanges.length < 2 && (
                    <button
                      className="size-12 inline-flex rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20"
                      onClick={() => addTimeRange(day)}
                    >
                      <span className="w-1/2 aspect-square m-auto">
                        <IconDuplicate />
                      </span>
                    </button>
                  )}
                  {schedule.timeRanges.length > 1 && (
                    <button
                      className="size-12 inline-flex rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                      onClick={() => removeTimeRange(day, schedule.timeRanges.length - 1)}
                    >
                      <span className="w-1/2 aspect-square m-auto">
                        <IconClose />
                      </span>
                    </button>
                  )}
                  <button className="size-12 inline-flex rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20">
                    <span className="w-1/2 aspect-square m-auto">
                      <IconEdit />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-6">
          <span className="size-4">
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

      <div className="border-t border-primary/10 py-4 xl:py-6 3xl:py-6 px-4 xl:px-6 3xl:px-8 sticky bottom-0 bg-background text-end">
        <Button variant="highlight">SAVE</Button>
      </div>
    </div>
  );
}
