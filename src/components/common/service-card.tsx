"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import astrologer from "@/assets/images/dummy/astrologer-01.jpg";
import Typography from "../ui/typography";

interface ServiceCardProps {
  service: any;
  highlight?: boolean;
  className?: string;
  onClick: (service: any) => void;
}

export function ServiceCard({ service, highlight = false, className, onClick }: ServiceCardProps) {
  const { icon, title, description } = service;
  return (
    <div
      className={cn(
        "group relative flex items-start gap-4 rounded-lg border-[2px] p-4 transition-all",
        highlight ? "border-primary bg-primary/10" : "border-secondary/30 hover:border-red-300",
        className
      )}
      onClick={() => onClick(service)}
    >
      <div className="relative size-10 md:size-12 xl:size-14 3xl:size-15 flex-shrink-0 overflow-hidden rounded-full">
        <Image
          src={icon || astrologer}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 48px) 100vw, 48px"
        />
      </div>

      <div className="flex-1 space-y-1">
        <Typography variant="h3" size="h6-head" className="font-head">
          {title}
        </Typography>
        <h3 className="font-head font-semibold text-gray-900"></h3>
        <p className="text-sm text-current">{description}</p>
      </div>

      <div className="absolute bottom-2 right-4 text-sm font-medium text-primary">
        Learn More
        <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </div>
    </div>
  );
}
