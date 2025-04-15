"use client";

import { useState } from "react";

import moment from "moment";
import toast from "react-hot-toast";
import { Calendar, Views, SlotInfo, View } from "react-big-calendar";

import { localizer } from "@/lib/calendar";
import { Button } from "@/components/ui/button";
import { convertEventsToTimeSlots } from "@/lib/utils";

import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/assets/scss/calendar.scss";
import CustomDateHeader from "./CustomDateHeader";

export const TIME_SLOTS = {
  hourly: [
    { id: "hourly-1", label: "10:00 - 11:00", startHour: 10, startMinute: 0, endHour: 11, endMinute: 0 },
    { id: "hourly-2", label: "11:00 - 12:00", startHour: 11, startMinute: 0, endHour: 12, endMinute: 0 },
    { id: "hourly-3", label: "12:00 - 13:00", startHour: 12, startMinute: 0, endHour: 13, endMinute: 0 },
    { id: "hourly-4", label: "13:00 - 14:00", startHour: 13, startMinute: 0, endHour: 14, endMinute: 0 },
    { id: "hourly-5", label: "14:00 - 15:00", startHour: 14, startMinute: 0, endHour: 15, endMinute: 0 },
    { id: "hourly-6", label: "15:00 - 16:00", startHour: 15, startMinute: 0, endHour: 16, endMinute: 0 },
    { id: "hourly-7", label: "16:00 - 17:00", startHour: 16, startMinute: 0, endHour: 17, endMinute: 0 },
    { id: "hourly-8", label: "17:00 - 18:00", startHour: 17, startMinute: 0, endHour: 18, endMinute: 0 }
  ],
  halfHourly: [
    { id: "halfHourly-1", label: "10:00 - 10:30", startHour: 10, startMinute: 0, endHour: 10, endMinute: 30 },
    { id: "halfHourly-2", label: "10:30 - 11:00", startHour: 10, startMinute: 30, endHour: 11, endMinute: 0 },
    { id: "halfHourly-3", label: "11:00 - 11:30", startHour: 11, startMinute: 0, endHour: 11, endMinute: 30 },
    { id: "halfHourly-4", label: "11:30 - 12:00", startHour: 11, startMinute: 30, endHour: 12, endMinute: 0 },
    { id: "halfHourly-5", label: "12:00 - 12:30", startHour: 12, startMinute: 0, endHour: 12, endMinute: 30 },
    { id: "halfHourly-6", label: "12:30 - 13:00", startHour: 12, startMinute: 30, endHour: 13, endMinute: 0 },
    { id: "halfHourly-7", label: "13:00 - 13:30", startHour: 13, startMinute: 0, endHour: 13, endMinute: 30 },
    { id: "halfHourly-8", label: "13:30 - 14:00", startHour: 13, startMinute: 30, endHour: 14, endMinute: 0 },
    { id: "halfHourly-9", label: "14:00 - 14:30", startHour: 14, startMinute: 0, endHour: 14, endMinute: 30 },
    { id: "halfHourly-10", label: "14:30 - 15:00", startHour: 14, startMinute: 30, endHour: 15, endMinute: 0 },
    { id: "halfHourly-11", label: "15:00 - 15:30", startHour: 15, startMinute: 0, endHour: 15, endMinute: 30 },
    { id: "halfHourly-12", label: "15:30 - 16:00", startHour: 15, startMinute: 30, endHour: 16, endMinute: 0 },
    { id: "halfHourly-13", label: "16:00 - 16:30", startHour: 16, startMinute: 0, endHour: 16, endMinute: 30 },
    { id: "halfHourly-14", label: "16:30 - 17:00", startHour: 16, startMinute: 30, endHour: 17, endMinute: 0 },
    { id: "halfHourly-15", label: "17:00 - 17:30", startHour: 17, startMinute: 0, endHour: 17, endMinute: 30 },
    { id: "halfHourly-16", label: "17:30 - 18:00", startHour: 17, startMinute: 30, endHour: 18, endMinute: 0 }
  ]
};

interface EventType {
  title: string;
  start: Date;
  end: Date;
  id: string;
}

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">(Views.WEEK);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [eventList, setEventList] = useState<EventType[]>([]);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [slotMode, setSlotMode] = useState<"hourly" | "halfHourly">("hourly");
  const timeSlots = TIME_SLOTS[slotMode];

  const [isBlockSidebarOpen, setIsBlockSidebarOpen] = useState(false);
  const [blockDate, setBlockDate] = useState<Date | null>(new Date());
  const [blockedEventIds, setBlockedEventIds] = useState<Set<string>>(new Set());

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const selected = slotInfo.start;

    const matchingSlots: number[] = [];

    // Reset slots on every new selection
    timeSlots.forEach((slot, idx) => {
      const slotStart = moment(selected).clone().hour(slot.startHour).minute(slot.startMinute);
      const slotEnd = moment(selected).clone().hour(slot.endHour).minute(slot.endMinute);

      const isBooked = eventList.some(
        (event) => moment(event.start).isSame(slotStart) && moment(event.end).isSame(slotEnd)
      );

      if (isBooked) {
        matchingSlots.push(idx);
      }
    });

    setSelectedSlots(matchingSlots);
    setSelectedDate(selected);
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleView = (view: View) => {
    // Ensure only valid views are set
    if (view === "month" || view === "week" || view === "day") {
      setCurrentView(view);
    }
  };

  const toggleSlot = (index: number) => {
    setSelectedSlots((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const handleSave = () => {
    if (!selectedDate) return;

    const newEvents: EventType[] = [];
    const daysToAdd = isRecurring ? 30 : 1;

    for (let i = 0; i < daysToAdd; i++) {
      const day = moment(selectedDate).clone().add(i, "days");

      // Skip Sundays
      if (day.day() === 0) continue;

      selectedSlots.forEach((slotIdx) => {
        const slot = timeSlots[slotIdx];

        const start = day.clone().hour(slot.startHour).minute(slot.startMinute).toDate();
        const end = day.clone().hour(slot.endHour).minute(slot.endMinute).toDate();

        const alreadyExists = eventList.some(
          (event) => moment(event.start).isSame(start) && moment(event.end).isSame(end)
        );

        if (!alreadyExists) {
          newEvents.push({
            id: `${day.format("YYYY-MM-DD")}-${slotIdx}`,
            title: "Booked",
            start,
            end
          });
        }
      });
    }
    // const params = {
    //   schedule_type: "custom_date",
    //   schedule_date: selectedDate,
    //   slot_duration: slotMode === "hourly" ? 60 : 30,
    //   cooling_period: 16,
    //   block_dates: [],
    //   time_slots: convertEventsToTimeSlots(newEvents, "UTC")
    // };
    // console.log(" params:", params);

    // HttpService.post(API_CONFIG.setAvailability, params)
    //   .then((res) => {
    //     if (!res.is_error) {
    //       console.log("res:", res); // Handle success response
    //       toast.success(res.message);
    //     } else {
    //       toast.error(res.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error); // Handle error response
    //   });
    setEventList((prev) => [...prev, ...newEvents]);
    setSelectedDate(null);
    setSelectedSlots([]);
    setIsRecurring(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Booking Calender</h1>
        <Button onClick={() => setIsBlockSidebarOpen(true)}>Block Time</Button>
      </div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        views={[Views.WEEK, Views.MONTH, Views.DAY]}
        defaultView={Views.WEEK}
        view={currentView}
        date={currentDate}
        onNavigate={handleNavigate}
        onView={(view) => handleView(view)}
        selectable
        onSelectSlot={handleSelectSlot}
        min={new Date(0, 0, 0, 7, 0)} // 07:00
        max={new Date(0, 0, 0, 22, 0)} // 22:00
        style={{ height: 600 }}
        eventPropGetter={(event) => {
          const isBlocked = blockedEventIds.has(event.id);
          // return {
          //   style: {
          //     backgroundColor: isBlocked ? "#DF2B2B" : "#3b82f6", // red vs blue
          //     borderRadius: "6px",
          //     padding: "2px 4px",
          //   },
          // };
          return {
            className: isBlocked ? "rbc-event-blocked" : "rbc-event-available"
          };
        }}
        components={{
          header: CustomDateHeader
        }}
      />

      {selectedDate && (
        <div>
          <div
            className="fixed top-0 end-0 w-full h-full bg-secondary bg-opacity-30 flex items-center justify-center z-20"
            onClick={() => setSelectedDate(null)}
          ></div>
          <div className="fixed flex flex-col top-0 end-0 w-96 h-full bg-accent-white bg-white rounded-s-xl p-6 shadow-xl z-30">
            <h2 className="text-lg font-semibold mb-2">Selected Date</h2>
            <p>{moment(selectedDate).format("dddd, MMMM Do YYYY, h:mm A")}</p>
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2">Select Time Slots</h3>
              <div className="mb-4 flex gap-2">
                <Button
                  variant={slotMode === "hourly" ? "default" : "outline"}
                  onClick={() => {
                    setSlotMode("hourly");
                    setSelectedSlots([]);
                  }}
                >
                  Hourly
                </Button>
                <Button
                  variant={slotMode === "halfHourly" ? "default" : "outline"}
                  onClick={() => {
                    setSlotMode("halfHourly");
                    setSelectedSlots([]);
                  }}
                >
                  Half-Hourly
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 overflow-auto">
              {timeSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleSlot(idx)}
                  className={`text-left px-4 py-2 rounded border ${selectedSlots.includes(idx) ? "bg-primary text-accent-white" : "bg-primary-200 text-secondary"}`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="recurring"
                checked={isRecurring}
                onChange={() => setIsRecurring(!isRecurring)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label htmlFor="recurring" className="text-sm">
                Apply to next 30 days (skip Sundays)
              </label>
            </div>
            <div className="flex">
              <Button
                onClick={handleSave}
                className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
              >
                Save Time Slots
              </Button>
              <Button
                onClick={() => setSelectedDate(null)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {isBlockSidebarOpen && (
        <>
          <div
            className="fixed top-0 end-0 w-full h-full bg-secondary bg-opacity-30 flex items-center justify-center z-20"
            onClick={() => setIsBlockSidebarOpen(false)}
          />
          <div className="fixed flex flex-col top-0 end-0 w-96 h-full bg-accent-white bg-white rounded-s-xl p-6 shadow-xl z-30">
            <h2 className="text-lg font-semibold mb-2">Block Time Slots</h2>

            <input
              type="date"
              className="border p-2 mb-4 w-full"
              onChange={(e) => setBlockDate(new Date(e.target.value))}
              value={blockDate ? blockDate.toISOString().split("T")[0] : ""}
            />

            {blockDate && (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {eventList
                  .filter((e) => moment(e.start).isSame(blockDate, "day") && !blockedEventIds.has(e.id))
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <p className="text-sm">
                        {moment(event.start).format("h:mm A")} - {moment(event.end).format("h:mm A")}
                      </p>
                      <Button size="sm" onClick={() => setBlockedEventIds((prev) => new Set(prev).add(event.id))}>
                        Block
                      </Button>
                    </div>
                  ))}
              </div>
            )}

            {!blockDate && <p>No Events</p>}

            <Button onClick={() => setIsBlockSidebarOpen(false)} className="mt-6 w-full">
              Close
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
