import React from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import IconStar from "@/shared/icons/star";

interface RatingBreakdownProps {
  ratingCounts: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  className?: string;
}

export function RatingBreakdown({ ratingCounts, className }: RatingBreakdownProps) {
  // Find the maximum count to calculate percentages
  const maxCount = Math.max(...Object.values(ratingCounts));

  // Calculate total reviews for percentages
  const totalReviews = Object.values(ratingCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div
      className={cn(
        "bg-primary/5 text-center p-5 md:p-6 xl:p-8 2xl:p-10 3xl:p-12 space-y-2",
        "rounded-lg xl:rounded-2xl 3xl:rounded-3xl",
        className
      )}
    >
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = ratingCounts[rating as keyof typeof ratingCounts] || 0;
        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
        const displayValue = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;

        return (
          <Typography
            key={rating}
            variant="div"
            size="base"
            className="flex items-center gap-2 md:gap-3 2xl:gap-4 font-semibold"
          >
            <div className="flex items-center gap-1 w-6">
              <span className="text-secondary/30 size-4 shrink-0">
                <IconStar />
              </span>
              <div className="text-right">{rating}</div>
            </div>

            {percentage !== 0 && (
              <div className="relative h-2 bg-primary rounded-full overflow-hidden" style={{ width: `${percentage}%` }}>
                <div className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500 ease-out" />
              </div>
            )}

            <div className="w-10 shrink-0 text-end">{displayValue}</div>
          </Typography>
        );
      })}
    </div>
  );
}
