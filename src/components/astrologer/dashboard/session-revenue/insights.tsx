import React from "react";
import SessionsChart from "./sessions-chart";
import RevenueChart from "./revenue-chart";
import Typography from "@/components/ui/typography";
import ReviewsChart from "./reviews-chart";

// Sample data
const sessionsData = [
  { name: "Jan", sessions: 25 },
  { name: "Feb", sessions: 45 },
  { name: "Mar", sessions: 35 },
  { name: "Apr", sessions: 38 },
  { name: "May", sessions: 32, isHighlighted: true },
  { name: "Jun", sessions: 65 },
  { name: "Jul", sessions: 30 },
  { name: "Aug", sessions: 48 },
  { name: "Sep", sessions: 24 },
  { name: "Oct", sessions: 40 },
  { name: "Nov", sessions: 30 },
  { name: "Dec", sessions: 38 }
];

const revenueData = [
  { name: "Week 1", revenue: 7500 },
  { name: "Week 2", revenue: 8200 },
  { name: "Week 3", revenue: 1800 },
  { name: "Week 4", revenue: 7200 },
  { name: "Week 5", revenue: 9200 },
  { name: "Week 6", revenue: 3600 },
  { name: "Week 7", revenue: 7800 },
  { name: "Week 8", revenue: 8400 }
];

const Insights = () => {
  return (
    <div className="container">
      <div className="flex justify-between mb-4 lg:mb-6 2xl:mb-8">
        <Typography variant="h2" size="h6" isTitle className="font-semibold">
          Session & Revenue Insights
        </Typography>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-4/12">
          <SessionsChart data={sessionsData} totalSessions={48} period="30 Days" lastRecord={36} />
        </div>
        <div className="md:w-3/12">
          <RevenueChart data={revenueData} totalRevenue="Rs. 8,999.00" percentageChange={2.45} />
        </div>
        <div className="md:w-2/12">
          <ReviewsChart />
        </div>
      </div>
    </div>
  );
};

export default Insights;
