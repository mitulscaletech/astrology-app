import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { StarRating } from "@/components/astrologer/review/star-rating";
import { Review } from "@/shared/interface";
import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import IconStar from "@/shared/icons/star";
import { Button } from "@/components/ui/button";

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
        "p-4 md:p-6 lg:p-6 xl:p-8 2xl:p-10 3xl:p-12 4xl:p-14 rounded-lg xl:rounded-2xl 3xl:rounded-3xl shadow-card",
        className
      )}
    >
      <Grid className="gap-y-4 justify-between" size="md">
        <Grid.Col className="xl:w-5/12 flex items-start gap-4">
          <div className="relative size-8 md:size-12 lg:size-16 2xl:size-20 3xl:2xl:size-24 shrink-0 rounded-full overflow-hidden border-2 border-primary/20">
            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
          </div>
          <div className="">
            <Typography variant="h4" size="h5" className="mb-2 2xl:mb-3 font-semibold">
              {user.name}
            </Typography>

            <div className="text-small xl:text-base flex flex-col gap-1 xl:gap-2 3xl:gap-2.5">
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
        <Grid.Col className="xl:w-7/12 3xl:w-6/12 flex flex-col gap-2 xl:gap-3 2xl:gap-4 4xl:gap-5">
          <div>
            <div className="flex items-center gap-0.5">
              <Typography variant="h3" size="h5" className="font-semibold">
                {rating.toFixed(1)}
              </Typography>
              <span className="size-5 md:size-5 xl:size-6 3xl:size-7">
                <IconStar />
              </span>
            </div>
            <Typography variant="p" size="base" className="text-secondary/50">
              {formattedDate}
            </Typography>
          </div>
          <Typography variant="p" size="p" className="text-secondary/50">
            {content}
          </Typography>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline">Comments for admin</Button>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
