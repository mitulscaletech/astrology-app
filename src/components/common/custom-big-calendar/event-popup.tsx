"use client";

import React, { useState } from "react";
import { CalendarEvent } from "@/shared/interface";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Clock, Users } from "lucide-react";
import IconCalender from "@/shared/icons/calender";
import IconClock from "@/shared/icons/clock";
import IconUser from "@/shared/icons/user";
import { cn } from "@/lib/utils";
import IconEdit from "@/shared/icons/edit";
import IconClose from "@/shared/icons/close";
import moment from "moment";
import ManageBookingModal from "@/components/astrologer/dashboard/manage-booking-modal";

interface EventPopupProps {
  event: CalendarEvent;
  children: React.ReactNode;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, children }) => {
  const [isManageBookingOpen, setIsManageBookingOpen] = useState(false);
  // Status colors
  const statusColors = {
    completed: "bg-primary text-accent-white",
    upcoming: "bg-highlight text-accent-white",
    blocked: "bg-secondary text-accent-white",
    pending: "bg-highlight text-accent-white"
  };

  // Category colors
  const categoryColors = {
    meeting: "bg-purple-100 text-purple-800 border-purple-300",
    personal: "bg-yellow-100 text-yellow-800 border-yellow-300",
    health: "bg-emerald-100 text-emerald-800 border-emerald-300",
    business: "bg-indigo-100 text-indigo-800 border-indigo-300"
  };

  // Status display text
  const statusText = {
    completed: "Completed",
    upcoming: "Upcoming",
    blocked: "Blocked"
  };

  // Category display text with capitalized first letter
  const categoryText = {
    meeting: "Meeting",
    personal: "Personal",
    health: "Health",
    business: "Business"
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-80 p-4 border-0 shadow-card">
          <div className="">
            <div className="flex mb-3 lg:mb-4 2xl:mb-4.5 justify-between">
              <div className="flex gap-2 items-center">
                <div className={cn("size-2 rounded-full", statusColors[event.status])}></div>
                <div>
                  <div className="text-xs truncate capitalize">{event?.service?.service_name}</div>
                  <h3 className="text-base font-semibold">{event?.service?.service_name}</h3>
                </div>
              </div>
              <div className="flex gap-2 items-center text-secondary">
                <button className="size-4 xl:size-5 3xl:size-6" onClick={() => setIsManageBookingOpen(true)}>
                  <IconEdit />
                </button>
                <button className="size-4 xl:size-5 3xl:size-6">
                  <IconClose />
                </button>
              </div>
            </div>

            {/* Date and Time */}
            <div className="flex flex-col gap-2 lg:gap-3 3xl:gap-4 rounded-md">
              <div className="flex gap-1 2xl:gap-2 items-center text-sm">
                <span className="size-4 2xl:size-6">
                  <IconCalender />
                </span>
                <span>{moment(event?.booking_date).format("dddd, MMMM D, YYYY")}</span>
              </div>
              <div className="flex gap-1 2xl:gap-2 items-center text-sm">
                <span className="size-4 2xl:size-6">
                  <IconClock />
                </span>
                <span>
                  {moment(event.start).format("hh:mm A")} - {moment(event.end).format("hh:mm A")}
                </span>
              </div>
              <div className="flex gap-1 2xl:gap-2 items-center text-sm">
                <span className="size-4 2xl:size-6">
                  <IconUser />
                </span>
                <span className="font-semibold">{event?.user?.name || "username"}</span>
              </div>
            </div>

            {/* Action buttons */}
            <Button variant="highlight" size="sm" className="w-full mt-1 lg:mt-2 2xl:mt-2.5">
              Join the Call
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <ManageBookingModal isOpen={isManageBookingOpen} onClose={() => setIsManageBookingOpen(false)} />
    </>
  );
};

export default EventPopup;
