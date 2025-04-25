import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center tracking-[0.04em] uppercase whitespace-nowrap rounded-md text-sm font-medium ring-offset-secondary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-100 hover:bg-highlight",
        danger: "bg-danger text-danger-800 hover:bg-danger/90",
        highlight: "bg-highlight text-accent-white hover:bg-secondary hover:text-accent-white",
        white: "bg-accent-white text-secondary hover:bg-secondary hover:text-accent-white",
        outline: "border border-secondary-200 bg-accent-white hover:bg-accent hover:text-secondary",
        secondary: "bg-secondary text-secondary-100 hover:bg-secondary/80",
        ghost: "hover:bg-primary hover:text-accent-white",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-16 px-12 py-2",
        sm: "h-12 text-xs rounded-md px-3",
        lg: "h-20 text-md font-semibold rounded-md px-8 ",
        icon: "h-7 w-7 p-1"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
