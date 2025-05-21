"use client";

import React from "react";
import { CalendarEvent } from "@/shared/interface";
import { cn } from "@/lib/utils";
import Image from "next/image";
import moment from "moment";
import placeholder from "@/assets/images/indian-astrologer-1.jpg";

interface EventComponentProps {
  event: CalendarEvent;
}

const EventComponent: React.FC<EventComponentProps> = ({ event }) => {
  // Status-based styling
  const statusStyles = {
    completed: "bg-primary/10 text-primary border-2 border-primary",
    upcoming: "bg-highlight/10 text-highlight border-2 border-highlight",
    blocked: "bg-secondary/10 text-secondary border-2 border-secondary/30",
    pending: "bg-highlight/10 text-highlight border-2 border-highlight"
  };

  // Category-based styling (optional extras)
  const categoryStyles = {
    meeting: "",
    personal: "",
    health: "",
    business: ""
  };

  return (
    <div
      className={cn(
        "p-2 flex items-start gap-1 overflow-hidden h-full rounded transition-colors",
        statusStyles[event.status],
        categoryStyles[event.category]
      )}
    >
      <div className="flex items-center shrink-0">
        <Image
          src={event?.pictureUrl || placeholder}
          alt={event?.user?.name || "username"}
          className="size-8 rounded-full object-cover"
          width={32}
          height={32}
        />
      </div>
      <div className="grow">
        <div className="text-xs lg:text-sm font-semibold truncate text-secondary">
          {event?.user?.name || "username"}
        </div>
        <div className="text-xs truncate">{event?.service?.service_name}</div>
        <div className="font-semibold text-sm truncate">{event?.service?.service_name}</div>
        <div className="text-secondary/50 text-end mt-1.5 font-medium">
          {moment(event.start).format("hh:mm A")} - {moment(event.end).format("hh:mm A")}
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
