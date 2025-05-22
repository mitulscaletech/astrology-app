import React from "react";

import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";
import IconArrowForward from "@/shared/icons/arrow-forward";

const AppointmentCard = () => {
  return (
    <div className="w-full max-w-112 bg-primary/5 rounded-lg xl:rounded-2xl 3xl:rounded-3xl py-4 xl:py-5 px-6 xl:px-8">
      <div className="flex justify-between item-center">
        <span className="inline-flex bg-primary px-2 xl:px-3 py-0.5 rounded-full font-semibold text-accent-white text-sm lg:text-base">
          Today
        </span>
        <Link
          href="/astrologer/booking-management"
          className="flex items-center text-secondary/40 hover:text-secondary transition-colors"
        >
          <span className="mr-1">Manage Booking</span>
          <span className="size-6">
            <IconArrowForward />
          </span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-2 lg:gap-3 xl:gap-4 3xl:gap-5 mt-2 lg:mt-3 w-full">
        <Avatar src="/placeholder.svg" alt="RB" fallback="AB" size="xl" className="border-2 border-primary/10" />

        <div className="flex flex-col mt-4 md:mt-0">
          <Typography variant="h4" size="p" className="text-secondary font-semibold">
            Richard Walters
          </Typography>
          <div className="flex flex-col">
            <Typography variant="h5" size="h6" className="text-primary">
              Janma Kundali
            </Typography>
            <Typography variant="h6" size="h6" className="text-primary font-bold mb-1">
              Holistic Life Blueprint
            </Typography>
            <p className="text-secondary/50 text-xs lg:text-sm font-medium">10:00 - 11:00 AM</p>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AppointmentCard;
