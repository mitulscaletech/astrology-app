"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Typography from "../ui/typography";
import IconSpeaker from "@/shared/icons/speaker";
import IconVoice from "@/shared/icons/voice";
import IconStar from "@/shared/icons/star";

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
        "flex flex-col md:flex-row md:items-center gap-2 border-2 rounded-lg p-3 lg:p-4 cursor-pointer transition-colors hover:shadow-sm",
        isSelected ? "bg-primary/10 border-2 border-primary text-card-foreground" : "border-secondary/20",
        className
      )}
    >
      <div className="flex gap-4 2xl:gap-5 3xl:gap-6 items-center grow">
        <div className="relative size-10 xl:size-12 2xl:size-14 4xl:size-15 rounded-full overflow-hidden shrink-0">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div>

        <div className="grow">
          <Typography variant="h3" size="h6-head" className="mb-1 font-head font-semibold transition-colors">
            {name}
          </Typography>
          <div className="flex items-center text-secondary/70 gap-1 md:gap-2 xl:gap-3">
            <span className="size-4 lg:size-5 2xl:size-6">
              <IconVoice />
            </span>
            <Typography variant="span" size="base">
              {languages.join(" • ")}
            </Typography>
          </div>
        </div>
      </div>
      <div className={cn("text-center flex flex-row md:flex-col justify-between", className)}>
        <div className="flex gap-1 lg:gap-2 justify-center items-center">
          <span className="font-medium">{rating}</span>
          <span className="size-4 lg:size-5 2xl:size-6">
            <IconStar />
          </span>
        </div>
        {reviews !== undefined && (
          <Typography variant="span" size="base" className=" text-secondary/70">
            {reviews}+ Reviews
          </Typography>
        )}
      </div>
    </div>
  );
}
