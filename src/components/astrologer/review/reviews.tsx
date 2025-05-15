"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Review, ReviewSummary } from "@/shared/interface";
import Typography from "@/components/ui/typography";
import { ReviewsSummary } from "@/components/astrologer/review/reviews-summary";
import { ReviewsList } from "@/components/astrologer/review/review-list";
import SearchBox from "@/components/ui/search-box";
import CustomSelect from "@/components/ui/custom-select";
import { Button } from "@/components/ui/button";

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
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-4 md:mb-6 xl:mb-7 2xl:mb-8">
        <Typography variant="h3" size="h6-head" className="font-bold" isTitle>
          Reviews
        </Typography>

        <div className="flex items-center gap-4 ms-auto">
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
      <div className="flex flex-col lg:flex-row gap-6 2xl:gap-8 4xl:gap-10">
        <div className="w-full lg:w-80 xl:w-96 3xl:w-112 lg:pe-6 2xl:pe-8 4xl:pe-10 shrink-0 lg:border-e border-secondary/10">
          <ReviewsSummary summary={summary} />
        </div>

        <div className="grow">
          <ReviewsList reviews={reviews} />

          <div className="text-center my-4 md:my-6 xl:my-8 2xl:my-10">
            <Button variant="highlight">VIEW MORE</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
