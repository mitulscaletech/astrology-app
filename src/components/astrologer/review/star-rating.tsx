import React from "react";
import { cn } from "@/lib/utils";
import IconStar from "@/shared/icons/star";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({ rating, maxRating = 5, size = "md", className }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const starSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const starSize = starSizes[size];

  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <span
          key={i}
          className={cn(
            starSize,
            i < fullStars
              ? "text-primary fill-primary"
              : i === fullStars && hasHalfStar
                ? "text-primary"
                : "text-muted",
            "transition-colors"
          )}
        >
          <IconStar />
        </span>
      ))}
    </div>
  );
}
