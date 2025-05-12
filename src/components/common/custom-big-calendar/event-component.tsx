"use client";

import React from "react";
import { CalendarEvent } from "@/shared/interface";
import { cn } from "@/lib/utils";

interface EventComponentProps {
  event: CalendarEvent;
}

const EventComponent: React.FC<EventComponentProps> = ({ event }) => {
  // Status-based styling
  const statusStyles = {
    completed: "bg-primary/10 text-primary border-2 border-primary",
    upcoming: "bg-highlight/10 text-highlight border-2 border-highlight",
    blocked: "bg-secondary/10 text-secondary border-2 border-secondary"
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
        "p-1 overflow-hidden h-full rounded-sm transition-colors",
        statusStyles[event.status],
        categoryStyles[event.category]
      )}
    >
      <div className="flex items-center gap-1 mb-1">
        <img src={event.pictureUrl} alt={event.name} className="w-5 h-5 rounded-full" />
        <span className="text-xs font-medium truncate">{event.name}</span>
      </div>
      <div className="font-medium text-sm truncate">{event.title}</div>
    </div>
  );
};

export default EventComponent;
