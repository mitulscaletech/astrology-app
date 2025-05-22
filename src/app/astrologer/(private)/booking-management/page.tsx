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
    <section className="small-section">
      <div className="container">
        <div className="flex justify-between mb-4 md:mb-6 lg:mb-8 2xl:mb-10 4xl:mb-12">
          <div>
            <Typography variant="h1" size="h4-head" className="font-head font-semibold text-secondary">
              Booking Management
            </Typography>
          </div>
          <div className="flex justify-start gap-6">
            <Button className="!px-3 xl:!px-6 hover:!bg-secondary/10" asChild variant="outline-secondary">
              <div className="flex">
                <Typography size="p" className="text-lg font-semibold text-secondary">
                  Auto-Accept Bookings
                </Typography>
                <Switch />
              </div>
            </Button>
            <Button className="!px-3 xl:!px-6" variant="outline">
              <span className="size-6 ms-auto">
                <IconDollar />
              </span>
              Manage Earning
            </Button>
            <Button className="!px-3 xl:!px-6" variant="default" onClick={() => route.push("/astrologer/reports")}>
              Create Report
            </Button>
          </div>
        </div>
        <Typography variant="h4" size="p" isTitle className="font-semibold mb-2 lg:mb-3">
          Upcoming Appointments
        </Typography>
        <AppointmentCard />
      </div>
    </section>
  );
}
