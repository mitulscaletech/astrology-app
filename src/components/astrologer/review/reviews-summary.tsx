import React from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import { RatingBreakdown } from "@/components/astrologer/review/rating-breakdown";
import { StarRating } from "@/components/astrologer/review/star-rating";
import IconTrendingUp from "@/shared/icons/trending-up";
import { ReviewSummary } from "@/shared/interface";

interface ReviewsSummaryProps {
  summary: ReviewSummary;
  className?: string;
}

export function ReviewsSummary({ summary, className }: ReviewsSummaryProps) {
  const { totalReviews, averageRating, growthPercentage, ratingBreakdown } = summary;

  // Format total reviews count
  const formattedTotal = totalReviews >= 1000 ? `${(totalReviews / 1000).toFixed(1)}k` : totalReviews.toString();

  return (
    <div className={cn("space-y-4 lg:space-y-5 2xl:space-y-6", className)}>
      {/* Total Reviews */}
      <div className="bg-primary/5 text-center p-5 md:p-6 xl:p-8 2xl:p-10 3xl:p-12 rounded-lg xl:rounded-2xl 3xl:rounded-3xl">
        <Typography variant="p" size="p" className="">
          Total Reviews
        </Typography>
        <div className="flex items-center justify-center gap-2 2xl:gap-3 font-bold my-1">
          <Typography variant="h2" size="h5" className="">
            {formattedTotal}
          </Typography>
          {growthPercentage > 0 && (
            <div className="px-1 md:px-2 py-1 md:py-1.5 flex gap-1 items-center text-sm bg-primary text-accent-white rounded-full">
              <span>+{growthPercentage}%</span>
              <span className="size-4 xl:size-6">
                <IconTrendingUp />
              </span>
            </div>
          )}
        </div>
        <Typography variant="p" size="base" className="text-secondary/50">
          Growth in Reviews On This Month
        </Typography>
      </div>

      {/* Average Rating */}
      <div className="bg-primary/5 text-center p-5 md:p-6 xl:p-8 2xl:p-10 3xl:p-12 rounded-lg xl:rounded-2xl 3xl:rounded-3xl">
        <Typography variant="p" className="text-muted-foreground">
          Average Rating
        </Typography>
        <div className="flex items-center justify-center gap-1 lg:gap-1.5 my-1">
          <Typography variant="h2" size="h5" className="font-semibold">
            {averageRating.toFixed(1)}
          </Typography>
          <StarRating rating={averageRating} />
        </div>
        <Typography variant="p" className="text-secondary/50">
          Average Rating On This Month
        </Typography>
      </div>

      {/* Rating Breakdown */}
      <RatingBreakdown ratingCounts={ratingBreakdown} />
    </div>
  );
}
