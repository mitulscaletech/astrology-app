"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { AstrologerReview } from "@/shared/interface";
import IconReply from "@/shared/icons/reply";
import IconThumbUp from "@/shared/icons/thumbUp";
import IconStar from "@/shared/icons/star";

interface AstrologerReviewsProps {
  reviews: AstrologerReview[];
}

export function AstrologerReviews({ reviews }: AstrologerReviewsProps) {
  const [visibleReviews, setVisibleReviews] = useState(3);

  // Calculate rating distribution
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((review) => {
    ratingCounts[review.rating as keyof typeof ratingCounts]++;
  });

  const totalReviews = reviews.length;

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, reviews.length));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-secondary-100 p-6">
        <h2 className="text-xl font-semibold text-primary-800 mb-6">Client Reviews</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-1 flex flex-col items-center justify-center bg-primary-50 rounded-lg p-6">
            <div className="text-5xl font-bold text-primary-800 mb-2">
              {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0).toFixed(2)}
              <span className="text-lg">/5</span>
            </div>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="h-5 w-5 fill-warning text-warning">
                  <IconStar />
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-600">Based on {totalReviews} reviews</div>
          </div>

          <div className="col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <div className="w-12 text-sm font-medium">{rating} stars</div>
                <div className="flex-1 mx-4">
                  <Progress
                    value={(ratingCounts[rating as keyof typeof ratingCounts] / totalReviews) * 100}
                    className="h-2 bg-primary-100"
                  />
                </div>
                <div className="w-12 text-sm text-right">{ratingCounts[rating as keyof typeof ratingCounts]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {reviews.slice(0, visibleReviews).map((review) => (
            <div key={review.id} className="border-b border-primary-100 pb-6 last:border-0">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-secondary-200 flex items-center justify-center text-secondary-700 font-medium mr-3">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-warning text-warning" : "text-gray-300"}`}
                    >
                      <IconStar />
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-4">{review.comment}</p>

              <div className="flex items-center text-sm text-gray-500">
                <button className="flex items-center mr-4 hover:text-primary-600">
                  <span className="h-4 w-4 me-1">
                    <IconThumbUp />
                  </span>
                  Helpful ({review.helpfulCount})
                </button>
                <button className="flex items-center hover:text-primary-600">
                  <span className="h-4 w-4 me-1">
                    <IconReply />
                  </span>
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleReviews < reviews.length && (
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={loadMoreReviews}
              className="border-primary-200 text-primary-600 hover:bg-primary-50"
            >
              Load More Reviews
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
