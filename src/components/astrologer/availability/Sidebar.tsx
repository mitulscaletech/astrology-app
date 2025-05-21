"use client";

import { cn } from "@/lib/utils";
import IconChevronRight from "@/shared/icons/chevronRight";
import IconClockActivity from "@/shared/icons/clock-activity";
import IconClockAnalog from "@/shared/icons/clock-analog";
import IconCalender from "@/shared/icons/calender";

type TabType = "available" | "unavailable" | "holidays";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType, title: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="py-4">
      <nav className="flex flex-col gap-3">
        <button
          onClick={() => onTabChange("available", "Working hours")}
          className={cn(
            "flex items-center gap-3 w-full px-3 md:px-4 xl:px-5 3xl:px-6 py-2 md:py-3 xl:py-3.5 3xl:py-4 font-medium",
            "transition-colors duration-200 ease-in-out",
            activeTab === "available" ? "hover:bg-primary/5 text-primary" : "text-foreground hover:bg-primary/5"
          )}
        >
          <span className="size-5">
            <IconClockAnalog />
          </span>
          <span>Available Time</span>
          <span className="size-3.5 ms-auto">
            <IconChevronRight />
          </span>
        </button>

        <button
          onClick={() => onTabChange("unavailable", "Unavailable Time")}
          className={cn(
            "flex items-center gap-3 w-full px-3 md:px-4 xl:px-5 3xl:px-6 py-2 md:py-3 xl:py-3.5 3xl:py-4 font-medium",
            "transition-colors duration-200 ease-in-out",
            activeTab === "unavailable" ? "hover:bg-primary/5 text-primary" : "text-foreground hover:bg-primary/5"
          )}
        >
          <span className="size-5">
            <IconClockActivity />
          </span>
          <span>Unavailable Time</span>
          <span className="size-3.5 ms-auto">
            <IconChevronRight />
          </span>
        </button>

        <button
          onClick={() => onTabChange("holidays", "Holidays")}
          className={cn(
            "flex items-center gap-3 w-full px-3 md:px-4 xl:px-5 3xl:px-6 py-2 md:py-3 xl:py-3.5 3xl:py-4 font-medium",
            "transition-colors duration-200 ease-in-out",
            activeTab === "holidays" ? "hover:bg-primary/5 text-primary" : "text-foreground hover:bg-primary/5"
          )}
        >
          <span className="size-5">
            <IconCalender />
          </span>
          <span className={activeTab === "holidays" ? "text-destructive font-medium" : ""}>Holidays</span>
          <span className="size-3.5 ms-auto">
            <IconChevronRight />
          </span>
        </button>
      </nav>
    </div>
  );
}
