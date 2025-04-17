import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full font-medium transition-colors", {
  variants: {
    variant: {
      default: "bg-secondary-200 text-secondary",
      success: "bg-success-800 text-success",
      danger: "bg-danger-800 text-danger",
      warning: "bg-warning-800 text-warning",
      pending: "bg-warning-800 text-warning"
    },
    size: {
      sm: "text-xs px-1.5 py-0.5",
      default: "text-xs px-2 py-1",
      lg: "text-sm px-3 py-1"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, size, ...props }, ref) => {
  return <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props} />;
});
Badge.displayName = "Badge";
