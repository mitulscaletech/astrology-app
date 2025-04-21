"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReviewCard from "@/components/astrologer/rating/rating-card";
import { reviews } from "@/lib/data";

export default function ReviewList() {
  const [timeFilter, setTimeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter reviews based on time period
  const getFilteredReviews = () => {
    const now = new Date();
    let filteredReviews = [...reviews];

    if (timeFilter === "week") {
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filteredReviews = filteredReviews.filter((review) => new Date(review.date) >= lastWeek);
    } else if (timeFilter === "month") {
      const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filteredReviews = filteredReviews.filter((review) => new Date(review.date) >= lastMonth);
    }

    // Sort reviews
    if (sortBy === "newest") {
      filteredReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "oldest") {
      filteredReviews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === "highest") {
      filteredReviews.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "lowest") {
      filteredReviews.sort((a, b) => a.rating - b.rating);
    }

    return filteredReviews;
  };

  const filteredReviews = getFilteredReviews();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Time Period:</span>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort By:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reviews found for the selected time period.</p>
          </div>
        )}
      </div>
    </div>
  );
}
