"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  name: string;
  imageUrl: string;
  languages: string[];
  rating: number;
  reviews?: number;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export default function ProfileCard({
  name,
  imageUrl,
  languages,
  rating,
  reviews,
  isSelected = false,
  onSelect,
  className
}: ProfileCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex items-center gap-4 border-2 rounded-lg p-4 cursor-pointer transition-colors hover:shadow-sm",
        isSelected ? "bg-primary/10 border-2 border-primary text-card-foreground" : "border-secondary/20",
        className
      )}
    >
      <div className="relative h-12 w-12 rounded-full overflow-hidden">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <div className="font-head text-2xl font-semibold transition-colors">{name}</div>
        <div className="text-sm text-muted-foreground line-clamp-3">{languages.join(" • ")}</div>
      </div>
      <div className={cn("text-center", className)}>
        <div className="flex gap-2 justify-center items-center">
          <span className="font-medium">{rating}</span>
          <span className="text-primary">★</span>
        </div>
        {reviews !== undefined && <span className="text-sm text-muted-foreground ml-1">{reviews}+ Reviews</span>}
      </div>
    </div>
  );
}
