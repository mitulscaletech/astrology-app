"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Sidebar from "./Sidebar";
import AvailableTimeTab from "./tabs/AvailableTimeTab";
import UnavailableTimeTab from "./tabs/UnavailableTimeTab";
import HolidaysTab from "./tabs/HolidaysTab";
import Typography from "@/components/ui/typography";

type TabType = "available" | "unavailable" | "holidays";

export default function Availability() {
  const [activeTab, setActiveTab] = useState<TabType>("available");
  const [tabTitle, setTabTitle] = useState("Working hours");

  const handleTabChange = (tab: TabType, title: string) => {
    setActiveTab(tab);
    setTabTitle(title);
  };

  return (
    <section className="py-4 md:py-6 xl:py-8">
      <div className="container">
        <Typography variant="h1" size="h4" className="font-bold mb-2 md:mb-3 lg:mb-4 2xl:mb-5">
          Availability
        </Typography>
        <div className="flex flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-64 xl:w-72 3xl:w-80 border-e border-secondary/10">
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col md:ps-4 lg:ps-6 2xl:ps-8">
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
