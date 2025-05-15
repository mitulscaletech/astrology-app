"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Loader from "@/components/ui/loader";
import DashboardBanner from "@/components/astrologer/dashboard/dashboard-banner";
import UpcomingSessions from "@/components/astrologer/upcoming-sessions/upcoming-sessions";
import Reviews from "@/components/astrologer/review/reviews";
import { mockReviews, mockReviewSummary } from "@/lib/data";
import Insights from "@/components/astrologer/dashboard/session-revenue/insights";

export default function AstrologerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/astrologer/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <DashboardBanner />
      <Insights />
      <UpcomingSessions />
      <Reviews summary={mockReviewSummary} reviews={mockReviews} />
    </>
  );
}
