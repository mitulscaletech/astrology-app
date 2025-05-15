import React from "react";
import { cn } from "@/lib/utils";
import IconStar from "@/shared/icons/star";
import IconStarOutline from "@/shared/icons/star-outline";

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
    sm: "size-4",
    md: "size-5 lg:size-6",
    lg: "size-6 lg:size-8"
  };

  const starSize = starSizes[size];

  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <span key={i} className={cn(starSize, "text-primary")}>
          {i < fullStars ? <IconStar /> : i === fullStars && hasHalfStar ? <IconStar /> : <IconStarOutline />}
        </span>
      ))}
    </div>
  );
}
