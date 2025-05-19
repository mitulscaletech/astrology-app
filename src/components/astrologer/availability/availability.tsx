"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Sidebar from "./Sidebar";
import AvailableTimeTab from "./tabs/AvailableTimeTab";
import UnavailableTimeTab from "./tabs/UnavailableTimeTab";
import HolidaysTab from "./tabs/HolidaysTab";
import Typography from "@/components/ui/typography";
import IconCalender from "@/shared/icons/calender";
import IconClock from "@/shared/icons/clock";
import IconClockAnalog from "@/shared/icons/clock-analog";
import IconClockActivity from "@/shared/icons/clock-activity";

type TabType = "available" | "unavailable" | "holidays";

export default function Availability() {
  const [activeTab, setActiveTab] = useState<TabType>("available");
  const [tabTitle, setTabTitle] = useState("Working hours");

  const handleTabChange = (tab: TabType, title: string) => {
    setActiveTab(tab);
    setTabTitle(title);
  };

  return (
    <section>
      <div className="container">
        <Typography variant="h1" size="h3" className="font-bold mb-2 md:mb-3 lg:mb-4 2xl:mb-5">
          Availability
        </Typography>
        <div className="flex flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-64 border-e border-secondary/10">
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-4 flex justify-between items-center border-b border-secondary/10">
              <Typography variant="h4" size="h6" className="font-semibold">
                <div className="flex items-center gap-2">
                  <span className="size-6">
                    {tabTitle === "Working hours" && <IconClockAnalog />}
                    {tabTitle === "Unavailable Time" && <IconClockActivity />}
                    {tabTitle === "Holidays" && <IconCalender />}
                  </span>
                  {tabTitle}
                </div>
              </Typography>
            </div>

            <Tabs defaultValue="available" value={activeTab} className="flex-1 flex flex-col">
              <TabsContent
                value="available"
                className="flex-1 flex flex-col data-[state=active]:flex data-[state=inactive]:hidden"
              >
                <AvailableTimeTab />
              </TabsContent>
              <TabsContent
                value="unavailable"
                className="flex-1 flex flex-col data-[state=active]:flex data-[state=inactive]:hidden"
              >
                <UnavailableTimeTab />
              </TabsContent>
              <TabsContent
                value="holidays"
                className="flex-1 flex flex-col data-[state=active]:flex data-[state=inactive]:hidden"
              >
                <HolidaysTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
