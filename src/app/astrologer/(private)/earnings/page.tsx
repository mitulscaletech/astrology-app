"use client";

import { useState } from "react";
import { EarningsChart } from "@/components/astrologer/earnings/earnings-chart";
import { EarningsHistory } from "@/components/astrologer/earnings/earnings-history";
import type { EarningData } from "@/shared/interface";
import IconChevronDown from "@/shared/icons/chevronDown";
import IconChevronUp from "@/shared/icons/chevronUp";
import { DashboardCard } from "@/components/ui/dashboard-card";
import IconRupee from "@/shared/icons/rupee";
import { SAMPLE_EARNINGS_DATA } from "@/lib/data";

export default function EarningsPage() {
  const [earningHistory] = useState<EarningData[]>([
    {
      amount: 150,
      date: "2023-12-15",
      clientName: "Sophia Chen",
      consultationType: "Birth Chart Reading",
      reportId: "REP-001"
    },
    {
      amount: 200,
      date: "2023-12-12",
      clientName: "Michael Johnson",
      consultationType: "Career Guidance",
      reportId: "REP-002"
    },
    {
      amount: 175,
      date: "2023-12-10",
      clientName: "Emma Wilson",
      consultationType: "Relationship Compatibility",
      reportId: "REP-003"
    },
    {
      amount: 225,
      date: "2023-12-08",
      clientName: "James Brown",
      consultationType: "Annual Forecast",
      reportId: "REP-004"
    },
    {
      amount: 150,
      date: "2023-12-05",
      clientName: "Olivia Smith",
      consultationType: "Spiritual Guidance",
      reportId: "REP-005"
    },
    {
      amount: 175,
      date: "2023-12-03",
      clientName: "Noah Garcia",
      consultationType: "Birth Chart Reading",
      reportId: "REP-006"
    },
    {
      amount: 200,
      date: "2023-12-01",
      clientName: "Ava Martinez",
      consultationType: "Career Guidance",
      reportId: "REP-007"
    },
    {
      amount: 150,
      date: "2023-11-28",
      clientName: "Ethan Robinson",
      consultationType: "Relationship Compatibility",
      reportId: "REP-008"
    },
    {
      amount: 225,
      date: "2023-11-25",
      clientName: "Isabella Taylor",
      consultationType: "Annual Forecast",
      reportId: "REP-009"
    },
    {
      amount: 175,
      date: "2023-11-22",
      clientName: "Benjamin Davis",
      consultationType: "Spiritual Guidance",
      reportId: "REP-010"
    }
  ]);

  const totalEarnings = 78500;
  const thisMonthEarnings = 9200;
  const lastMonthEarnings = 8500;
  const percentageChange = ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100;

  return (
    <div className="container space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Earnings</h1>
        <p className="text-secondary-300">View your earnings history and statistics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard
          title="Total Earnings"
          value={`$${totalEarnings.toLocaleString()}`}
          icon={
            <span className="h-6 w-6 text-secondary-300">
              <IconRupee />
            </span>
          }
        />
        <DashboardCard
          title="This Month"
          value={`$${thisMonthEarnings.toLocaleString()}`}
          description={
            <span className="flex items-center text-xs">
              {percentageChange >= 0 ? (
                <span className="mr-1 h-3 w-3 text-success">
                  <IconChevronUp />
                </span>
              ) : (
                <span className="mr-1 h-3 w-3 text-danger">
                  <IconChevronDown />
                </span>
              )}
              <span className={percentageChange >= 0 ? "text-success" : "text-danger"}>
                {Math.abs(percentageChange).toFixed(1)}% from last month
              </span>
            </span>
          }
          icon={
            <span className="h-6 w-6 text-secondary-300">
              <IconRupee />
            </span>
          }
        />
        <DashboardCard
          title="Last Month"
          value={`$${lastMonthEarnings.toLocaleString()}`}
          icon={
            <span className="h-6 w-6 text-secondary-300">
              <IconRupee />
            </span>
          }
        />
      </div>

      <EarningsChart data={SAMPLE_EARNINGS_DATA} />

      <EarningsHistory data={earningHistory} />
    </div>
  );
}
