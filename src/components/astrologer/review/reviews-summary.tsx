import React from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import { RatingBreakdown } from "@/components/astrologer/review/rating-breakdown";
import { StarRating } from "@/components/astrologer/review/star-rating";
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
    <div className={cn("space-y-10 p-6 bg-gray-50 rounded-lg", className)}>
      {/* Total Reviews */}
      <div className="space-y-1">
        <Typography variant="caption" className="text-muted-foreground">
          Total Reviews
        </Typography>
        <div className="flex items-end gap-2">
          <Typography variant="h2" className="font-bold">
            {formattedTotal}
          </Typography>
          {growthPercentage > 0 && (
            <div className="flex items-center text-sm text-green-600 mb-1 font-medium">
              <span>+{growthPercentage}%</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          )}
        </div>
        <Typography variant="caption" className="text-muted-foreground">
          Growth in Reviews On This Month
        </Typography>
      </div>

      {/* Average Rating */}
      <div className="space-y-1">
        <Typography variant="caption" className="text-muted-foreground">
          Average Rating
        </Typography>
        <Typography variant="h2" className="font-bold">
          {averageRating.toFixed(1)}
        </Typography>
        <div className="flex items-center gap-1">
          <StarRating rating={averageRating} size="sm" />
        </div>
        <Typography variant="caption" className="text-muted-foreground">
          Average Rating On This Month
        </Typography>
      </div>

      {/* Rating Breakdown */}
      <RatingBreakdown ratingCounts={ratingBreakdown} />
    </div>
  );
}
