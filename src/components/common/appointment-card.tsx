import React from "react";

import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";
import IconArrowForward from "@/shared/icons/arrow-forward";

const AppointmentCard = () => {
  return (
    <div className="w-full max-w-112 bg-primary/5 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 py-5 px-6 md:px-8">
      {/* <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"> */}
      <div className="flex justify-between item-center">
        <Typography
          variant="p"
          className="bg-primary px-4 py-2 rounded-full font-medium text-accent-white text-sm inline-block"
        >
          Today
        </Typography>
        <Link
          href="/astrologer/booking-management"
          className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-300 group"
        >
          <span className="mr-1">Manage Booking</span>
          <span className="size-6">
            <IconArrowForward />
          </span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 mt-12 md:mt-6 w-full">
        {/* <Avatar src={booking.practitioner.avatarUrl} alt={booking.practitioner.name} size="lg" /> */}
        <Avatar src="/placeholder.svg" alt="RB" fallback="AB" size="lg" className="border-2 border-primary/10" />

        <div className="flex flex-col mt-4 md:mt-0">
          <Typography variant="h3" className="text-lg text-secondary font-semibold">
            Richard Walters
          </Typography>
          <div className="flex flex-col">
            <Typography variant="h2" className="text-primary text-2xl font-normal">
              Janma Kundali
            </Typography>
            <Typography variant="h1" className="text-primary text-2xl font-bold mb-1">
              Holistic Life Blueprint
            </Typography>
            <p className="text-secondary/50 text-sm">10:00 - 11:00 AM</p>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AppointmentCard;
