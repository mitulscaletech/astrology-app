"use client";

import React from "react";
import { CalendarEvent } from "@/shared/interface";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Clock, Users } from "lucide-react";

interface EventPopupProps {
  event: CalendarEvent;
  children: React.ReactNode;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, children }) => {
  // Status colors
  const statusColors = {
    completed: "bg-primary text-accent-white border-primary",
    upcoming: "bg-highlight text-accent-white border-primary",
    blocked: "bg-secondary text-accent-white border-secondary"
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
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[400px] p-4">
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
            <p className="text-sm text-muted-foreground">Event details and information</p>
          </div>

          {/* Person info */}
          <div className="flex items-center space-x-3">
            <Avatar src={event.pictureUrl} alt={event.name} fallback={getInitials(event.name)} />
            <div>
              <p className="text-sm font-medium">{event.name}</p>
              <div className="flex space-x-2 mt-1">
                <Badge variant="outline" className={statusColors[event.status]}>
                  {statusText[event.status]}
                </Badge>
                <Badge variant="outline" className={categoryColors[event.category]}>
                  {categoryText[event.category]}
                </Badge>
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-2 bg-muted/30 p-3 rounded-md">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 opacity-70" />
              <span>{format(event.start, "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 opacity-70" />
              <span>
                {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
              </span>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="text-sm">
              <p className="font-medium mb-1">Description:</p>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end space-x-2 pt-2">
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Join the Call
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EventPopup;
