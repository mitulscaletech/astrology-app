"use client";

import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { CalendarEvent } from "@/shared/interface";
import { events } from "@/lib/data";
import EventPopup from "@/components/common/custom-big-calendar/event-popup";
import CustomHeader from "@/components/common/custom-big-calendar/custom-header";
import EventComponent from "@/components/common/custom-big-calendar/event-component";
import useWindowSize from "@/shared/hooks/useWindowSize";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/assets/scss/calendar.scss";
import CustomDateHeader from "@/components/astrologer/booking/custom-date-header";

// Setup localizer for the calendar
const localizer = momentLocalizer(moment);

const CustomBigCalendar = () => {
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const { width } = useWindowSize();

  // Default view based on screen size
  React.useEffect(() => {
    if (width) {
      if (width < 768) {
        setView(Views.DAY);
      } else {
        setView(Views.WEEK);
      }
    }
  }, [width]);

  // Custom event styling based on status
  const eventPropGetter = (event: CalendarEvent) => {
    const className = "cursor-pointer";
    return { className };
  };

  const EventWrapper = ({ event }: { event: CalendarEvent }) => (
    <EventPopup event={event}>
      <div style={{ height: "100%" }}>
        <EventComponent event={event} />
      </div>
    </EventPopup>
  );

  const TimeGutterHeader = () => <span className="uppercase">Time</span>;

  return (
    <div className="small-section">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        // style={{ height: "100%" }}
        style={{ height: "800px" }}
        eventPropGetter={eventPropGetter}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        min={new Date(0, 0, 0, 7, 0)} // 07:00
        max={new Date(0, 0, 0, 18, 0)} // 18:00 6-1 = 5PM
        components={{
          toolbar: (props) => (
            <CustomHeader {...props} view={view} date={date} onViewChange={setView} onNavigate={setDate} />
          ),
          event: EventWrapper,
          eventWrapper: ({ children }) => <div>{children}</div>,
          header: CustomDateHeader,
          timeGutterHeader: TimeGutterHeader
        }}
        formats={{
          timeGutterFormat: (date, culture, localizer) => localizer?.format(date, "hh:mm A", culture),
          dayFormat: (date, culture, localizer) => localizer?.format(date, "DD ddd", culture),
          eventTimeRangeFormat: () => "",
          timeRangeFormat: () => "",
          agendaTimeRangeFormat: () => ""
        }}
      />
    </div>
  );
};

export default CustomBigCalendar;
