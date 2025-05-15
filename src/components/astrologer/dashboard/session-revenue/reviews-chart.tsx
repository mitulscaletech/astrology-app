"use client";

import React from "react";
import Image from "next/image";
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import IconStar from "@/shared/icons/star";

import astrologerImg1 from "@/assets/images/dummy/astrologer-01.jpg";
import astrologerImg2 from "@/assets/images/dummy/astrologer-02.jpg";
import astrologerImg3 from "@/assets/images/dummy/astrologer-03.jpg";

interface Review {
  id: number;
  rating: number;
  date: string;
  avatar: string;
  x: number;
  y: number;
}

const reviews: Review[] = [
  { id: 1, rating: 4.5, date: "24 Apr", avatar: astrologerImg1.src, x: 20, y: 70 },
  { id: 2, rating: 5.0, date: "17 Apr", avatar: astrologerImg2.src, x: 35, y: 85 },
  { id: 3, rating: 4.1, date: "10 Apr", avatar: astrologerImg3.src, x: 10, y: 55 },
  { id: 4, rating: 4.2, date: "22 Apr", avatar: astrologerImg1.src, x: 45, y: 60 },
  { id: 5, rating: 4.7, date: "2 Apr", avatar: astrologerImg2.src, x: 60, y: 75 },
  { id: 6, rating: 4.8, date: "15 Apr", avatar: astrologerImg3.src, x: 75, y: 80 },
  { id: 7, rating: 4.3, date: "8 Apr", avatar: astrologerImg1.src, x: 85, y: 65 },
  { id: 8, rating: 2.6, date: "19 Apr", avatar: astrologerImg2.src, x: 95, y: 72 }
];

const ReviewsChart = () => {
  return (
    <div className="relative p-4 xl:p-6 bg-primary/5 flex flex-col rounded-lg xl:rounded-xl 3xl:rounded-2xl min-h-full">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl font-bold">4.7</span>
          <div className="size-6 text-primary">
            <IconStar />
          </div>
        </div>
        <div className="text-muted-foreground text-sm font-normal">+20 Reviews</div>
      </div>
      <div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis type="number" dataKey="x" hide domain={[0, 100]} />
              <YAxis type="number" dataKey="y" hide domain={[0, 100]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const review = payload[0].payload as Review;
                    return (
                      <div className="bg-primary text-accent-white p-2 border rounded-lg shadow-sm">
                        <div className="items-center gap-2">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{review.rating}</span>
                            <div className="h-4 w-4 text-primary">
                              <IconStar />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter
                data={reviews}
                shape={(props: any) => {
                  const { cx, cy } = props;
                  return (
                    <g transform={`translate(${cx},${cy})`}>
                      <image
                        href={props.payload.avatar}
                        x="-15"
                        y="-15"
                        height="30"
                        width="30"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#circleClip)"
                      />
                      <defs>
                        <clipPath id="circleClip">
                          <circle cx="0" cy="0" r="15" />
                        </clipPath>
                      </defs>
                    </g>
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReviewsChart;
