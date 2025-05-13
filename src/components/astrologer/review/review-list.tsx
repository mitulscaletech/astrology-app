import React from "react";
import { cn } from "@/lib/utils";
import { ReviewCard } from "@/components/astrologer/review/review-card";
import { Review } from "@/shared/interface";

interface ReviewsListProps {
  reviews: Review[];
  className?: string;
}

export function ReviewsList({ reviews, className }: ReviewsListProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
