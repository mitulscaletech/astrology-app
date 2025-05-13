import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { StarRating } from "@/components/astrologer/review/star-rating";
import { Review } from "@/shared/interface";
import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import IconStar from "@/shared/icons/star";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const { user, rating, date, content, totalSpend, totalReviews } = review;

  // Format date (e.g., "25-10-2023" to "25-10-2023")
  const formattedDate = date;

  return (
    <div
      className={cn(
        "p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 3xl:p-14 rounded-lg xl:rounded-2xl 3xl:rounded-3xl shadow-card",
        className
      )}
    >
      <Grid className="gap-y-4 justify-between" size="md">
        <Grid.Col className="md:w-5/12 flex items-start gap-4">
          <div className="relative size-8 md:size-12 lg:size-16 2xl:size-20 3xl:2xl:size-24 shrink-0 rounded-full overflow-hidden">
            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
          </div>
          <div className="">
            <Typography variant="h4" size="h5" className="mb-3 font-semibold">
              {user.name}
            </Typography>

            <div className="text-small xl:text-base flex flex-col gap-1 md:gap-2 2xl:gap-2.5">
              <div className="flex items-center gap-2">
                <span className="text-secondary/70">Total Spend:</span>
                <span className="font-bold">${totalSpend}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary/70">Total Review:</span>
                <span className="font-bold">{totalReviews}</span>
              </div>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col className="md:w-6/12 flex flex-col gap-2 md:gap-3 lg:gap-4">
          <div>
            <div className="flex items-center gap-0.5">
              <Typography variant="h3" size="h5" className="font-semibold">
                {rating.toFixed(1)}
              </Typography>
              <span className="size-5 md:size-5 xl:size-6 3xl:size-7">
                <IconStar />
              </span>
            </div>
          </div>
          <Typography variant="p" size="base" className="text-secondary/50">
            {formattedDate}
          </Typography>
          <Typography variant="p" size="p" className="text-secondary/50">
            {content}
          </Typography>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-sm transition-colors hover:bg-gray-50 flex-1">
              PUBLIC COMMENT
            </button>
            <button className="px-4 py-2 border border-primary text-primary rounded-lg font-medium text-sm transition-colors hover:bg-primary hover:text-white flex-1">
              DIRECT MESSAGE
            </button>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
