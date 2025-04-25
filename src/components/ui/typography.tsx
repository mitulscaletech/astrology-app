import React from "react";
import { cn } from "@/lib/utils"; // or use clsx if you prefer

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label";
type Size = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "base" | "small" | "xs";

interface TypographyProps<T extends React.ElementType = "p"> {
  variant?: T;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  isTitle?: boolean;
}

const sizeClasses: Record<Size, string> = {
  h1: "text-2xl md:text-3xl lg:text-5xl xl:text-7.5xl !leading-[1.1]", // 84
  h2: "text-2xl md:text-3xl lg:text-5xl xl:text-7xl !leading-[1.1]", // 72
  h3: "text-2xl md:text-3xl lg:text-5xl xl:text-6xl !leading-[1.1]", // 60
  h4: "text-2xl md:text-3xl lg:text-5xl xl:text-5xl !leading-[1.1]", // 48
  h5: "text-2xl md:text-3xl lg:text-5xl xl:text-3.5xl !leading-[1.2]", // 32
  h6: "text-2xl md:text-3xl lg:text-5xl xl:text-2xl !leading-[1.2]", // 24
  p: "text-2xl md:text-3xl lg:text-5xl xl:text-lg !leading-[1.4]", // 18
  base: "text-2xl md:text-3xl lg:text-5xl xl:text-base !leading-[1.4]", // 16
  small: "text-2xl md:text-3xl lg:text-5xl xl:text-small !leading-[1.4]", // 14
  xs: "text-2xl md:text-3xl lg:text-5xl xl:text-xs !leading-[1.4]" // 12
};

const Typography = <T extends React.ElementType = "p">({
  variant,
  size = "p",
  className,
  children,
  isTitle = false,
  ...props
}: TypographyProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) => {
  const Component = variant || "p";
  return (
    <Component className={cn(sizeClasses[size], isTitle && "uppercase", className)} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
