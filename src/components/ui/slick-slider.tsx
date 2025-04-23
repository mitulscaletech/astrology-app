"use client";

import { lazy, Suspense } from "react";

// Dynamically import react-slick slider
const Slick = lazy(() => import("@/components/ui/slick-internal"));

type SlickSliderProps = {
  children: React.ReactNode;
  settings: any;
  className?: string;
};

export default function SlickSlider({ children, settings, className }: SlickSliderProps) {
  return (
    <Suspense fallback={<div className="h-64 w-full animate-pulse bg-gray-200 rounded-xl" />}>
      <Slick settings={settings} className={className}>
        {children}
      </Slick>
    </Suspense>
  );
}
