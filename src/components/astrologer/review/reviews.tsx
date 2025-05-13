"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Review, ReviewSummary } from "@/shared/interface";
import Typography from "@/components/ui/typography";
import { ReviewsSummary } from "@/components/astrologer/review/reviews-summary";
import { ReviewsList } from "@/components/astrologer/review/review-list";
import SearchBox from "@/components/ui/search-box";
import CustomSelect from "@/components/ui/custom-select";

interface ReviewsProps {
  summary: ReviewSummary;
  reviews: Review[];
  className?: string;
}

const daysOptions = [
  { value: "7", label: "Last 7 Days" },
  { value: "14", label: "Last 14 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "60", label: "Last 60 Days" }
];

const Reviews = ({ summary, reviews, className }: ReviewsProps) => {
  const [selected, setSelected] = useState<{ value: string; label: string } | null>(null);

  return (
    <div className={cn("container", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Typography variant="h3" size="h6" className="font-bold">
          Reviews
        </Typography>

        <div className="flex items-center gap-4">
          <div className="flex justify-end gap-2 lg:gap-3">
            <div className="w-40 md:w-48 xl:w-48 2xl:w-52">
              <CustomSelect
                isMulti={false}
                options={daysOptions}
                value={selected}
                onChange={(option) => setSelected(option as { value: string; label: string } | null)}
                isFloatingLabel={false}
              />
            </div>
            <div className="w-32 md:w-40 xl:w-48">
              <SearchBox />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ReviewsSummary summary={summary} />
        </div>

        <div className="lg:col-span-2">
          <ReviewsList reviews={reviews} />

          <button className="w-full mt-8 px-4 py-3 bg-orange-500 text-white font-medium rounded-lg transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
            VIEW MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
