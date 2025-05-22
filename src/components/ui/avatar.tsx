"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // Tailwind-friendly utility (optional)
import Image from "next/image";

type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string; // typically initials like "AB"
  size?: "sm" | "md" | "lg" | "xl" | "default";
  className?: string;
};

const sizeClasses = {
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  md: "size-12 text-base",
  lg: "size-12 md:size-16 text-lg",
  xl: "size-16 md:size-20 text-lg lg:text-xl 2xl:text-2xl"
};

export function Avatar({ src, alt, fallback = "??", size = "default", className }: AvatarProps) {
  const [isError, setIsError] = React.useState(false);

  const showFallback = !src || isError;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-secondary-200 text-muted-foreground font-medium overflow-hidden select-none",
        sizeClasses[size],
        className
      )}
      role="img"
      aria-label={alt || fallback}
    >
      {showFallback ? (
        <span>{fallback}</span>
      ) : (
        <Image
          src={src}
          alt={alt || fallback}
          onError={() => setIsError(true)}
          className="h-full w-full object-cover"
          width={48}
          height={48}
        />
      )}
    </div>
  );
}
