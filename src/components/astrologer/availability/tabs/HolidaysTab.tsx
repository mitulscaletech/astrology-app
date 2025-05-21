"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "../Calendar";
import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import IconClose from "@/shared/icons/close";
import IconDuplicate from "@/shared/icons/duplicate";
import IconTimezone from "@/shared/icons/timezone";
import { DatePickerField } from "@/components/ui/custom-datepicker";
import { Controller, useForm } from "react-hook-form";

type Holiday = {
  name: string;
  date: Date;
  enabled: boolean;
};

export default function HolidaysTab() {
  const [timezone, setTimezone] = useState("India (GMT)");
  const [publicHolidays, setPublicHolidays] = useState<Holiday[]>([
    { name: "New Year", date: new Date(2026, 0, 1), enabled: true },
    { name: "Good Friday", date: new Date(2026, 3, 3), enabled: true },
    { name: "Easter Monday", date: new Date(2026, 3, 6), enabled: true },
    { name: "Labor Day", date: new Date(2025, 4, 5), enabled: true },
    { name: "Memorial Day", date: new Date(2025, 4, 26), enabled: false },
    { name: "Independence Day", date: new Date(2025, 7, 25), enabled: true }
  ]);

  const {
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      startTime: null,
      endTime: null
    }
  });

  const toggleHoliday = (index: number) => {
    const updatedHolidays = [...publicHolidays];
    updatedHolidays[index].enabled = !updatedHolidays[index].enabled;
    setPublicHolidays(updatedHolidays);
  };

  return (
    <div className="flex-1">
      <div className="space-y-8">
        <div className="mb-3 md:mb-4 xl:mb-5 2xl:mb-6 4xl:mb-8">
          <Typography variant="h4" size="h5" className="font-bold mb-1">
            Plan Your Time Off
          </Typography>
          <p>
            Everyone needs a break. Set your upcoming holidays so you won&apos;t receive bookings during those days. You
            can always update or remove these later.
          </p>
        </div>

        <Grid className="" size="lg">
          <Grid.Col className="md:w-5/12">
            <div>
              <Calendar value={new Date()} onChange={() => {}} unavailableDates={[]} minYear={2025} />
            </div>
          </Grid.Col>
          <Grid.Col className="md:w-7/12">
            <div className="space-y-6">
              <div className="flex items-start gap-2 justify-between">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="font-semibold mb-2 lg:mb-3 inline-flex">From</label>
                    <div className="flex gap-4">
                      <div className="w-36">
                        <Controller
                          control={control}
                          name="startDate"
                          render={({ field }) => (
                            <DatePickerField
                              placeholder="From Date"
                              selected={field.value}
                              onChange={field.onChange}
                              error={errors.startDate?.message}
                              isFloatingLabel={false}
                              variant="secondary-10"
                              inputSize="sm"
                              className="text-center"
                            />
                          )}
                        />
                      </div>
                      <div className="w-32">
                        <Controller
                          control={control}
                          name="startTime"
                          render={({ field }) => (
                            <DatePickerField
                              placeholder="From Time"
                              selected={field.value}
                              onChange={field.onChange}
                              error={errors.startDate?.message}
                              showTimeOnly
                              dateFormat="h:mm aa"
                              isFloatingLabel={false}
                              variant="secondary-10"
                              inputSize="sm"
                              className="text-center"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="font-semibold mb-2 lg:mb-3 inline-flex">To</label>
                    <div className="flex gap-4">
                      <div className="w-36">
                        <Controller
                          control={control}
                          name="endDate"
                          render={({ field }) => (
                            <DatePickerField
                              placeholder="To Date"
                              selected={field.value}
                              onChange={field.onChange}
                              error={errors.endDate?.message}
                              isFloatingLabel={false}
                              variant="secondary-10"
                              inputSize="sm"
                              className="text-center"
                            />
                          )}
                        />
                      </div>
                      <div className="w-32">
                        <Controller
                          control={control}
                          name="endTime"
                          render={({ field }) => (
                            <DatePickerField
                              placeholder="To Time"
                              selected={field.value}
                              onChange={field.onChange}
                              error={errors.startDate?.message}
                              showTimeOnly
                              dateFormat="h:mm aa"
                              isFloatingLabel={false}
                              variant="secondary-10"
                              inputSize="sm"
                              className="text-center"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
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

              <div className="flex items-center gap-2">
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

        <div className="mt-3 md:mt-4 xl:mt-5 2xl:mt-6 4xl:mt-8">
          <div className="mb-3 md:mb-4 xl:mb-5 2xl:mb-6 4xl:mb-8">
            <Typography variant="h4" size="h6" className="font-bold mb-1">
              Public Holidays
            </Typography>
            <p>
              Your availability will be automatically blocked for national holidays, based on the Indian time zone,
              across all session types.
            </p>
          </div>

          <div className="flex flex-col gap-2 md:gap-3 2xl:gap-4 mt-6 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
            {publicHolidays.map((holiday, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 md:gap-2 xl:gap-2.5 3xl:gap-3 justify-between p-4 bg-secondary/5 border border-secondary/10 rounded-md"
              >
                <div className="flex grow items-center justify-between gap-1.5 font-medium">
                  <div>{holiday.name}</div>
                  <div className="min-w-40">{format(holiday.date, "d MMM yyyy")}</div>
                </div>
                <Switch checked={holiday.enabled} onCheckedChange={() => toggleHoliday(index)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary/5 p-4 sticky bottom-0 bg-background text-end z-2 bg-accent-white/10 backdrop-blur-sm">
        <Button variant="highlight">SAVE</Button>
      </div>
    </div>
  );
}
