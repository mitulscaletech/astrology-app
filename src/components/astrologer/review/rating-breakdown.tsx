import React from "react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

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
    <div className={cn("space-y-2", className)}>
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = ratingCounts[rating as keyof typeof ratingCounts] || 0;
        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
        const displayValue = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;

        return (
          <div key={rating} className="flex items-center gap-2">
            <div className="flex items-center gap-1 w-6">
              <Typography variant="small" className="font-medium text-right">
                {rating}
              </Typography>
              <span className="text-xs text-muted-foreground">★</span>
            </div>

            <div className="relative h-2 bg-muted rounded-full flex-1 overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <Typography variant="small" className="w-12 text-right font-medium">
              {displayValue}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}
