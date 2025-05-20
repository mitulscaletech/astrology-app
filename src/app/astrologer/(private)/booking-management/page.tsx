"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import AppointmentCard from "@/components/common/appointment-card";

import { IconDollar } from "@/shared/icons/booking";

export default function AstrologerDashboard() {
  const route = useRouter();

  return (
    <div className="container mt-15">
      <div className="flex justify-between">
        <div>
          <Typography size="h4" className="text-5xl font-semibold text-secondary">
            Booking Management
          </Typography>
        </div>
        <div className="flex justify-start gap-6">
          <Button asChild variant="outline-secondary">
            <div className="flex">
              <Typography size="p" className="text-lg font-semibold text-secondary">
                Auto-Accept Bookings
              </Typography>
              <Switch />
            </div>
          </Button>
          <Button variant="outline">
            <span className="size-6 ms-auto">
              <IconDollar />
            </span>
            Manage Earning
          </Button>
          <Button variant="default" onClick={() => route.push("/astrologer/reports")}>
            Create Report
          </Button>
        </div>
      </div>
      <Typography size="p" className="text-lg font-semibold uppercase">
        Upcoming Appointments
      </Typography>
      <AppointmentCard />
    </div>
  );
}
