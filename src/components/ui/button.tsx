import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex text-xs md:text-sm lg:text-base xl:text-lg gap-1 md:gap-1.5 2xl:gap-2.5 items-center justify-center tracking-[0.04em] uppercase whitespace-nowrap rounded-md font-semibold ring-offset-secondary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-100 hover:bg-highlight",
        danger: "bg-danger text-danger-800 hover:bg-danger/90",
        highlight: "bg-highlight text-accent-white hover:bg-primary hover:text-accent-white",
        white: "bg-accent-white text-secondary hover:bg-secondary hover:text-accent-white",
        outline: "border border-secondary-200 bg-accent-white hover:bg-accent hover:text-secondary",
        secondary: "bg-secondary text-secondary-100 hover:bg-secondary/80",
        ghost: "hover:bg-primary hover:text-accent-white",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 md:h-12 xl:h-13 2xl:h-15 4xl:h-16 px-5 lg:px-6 xl:px-8 2xl:px-12 py-2",
        sm: "h-9 md:h-11 xl:h-12 rounded-md px-4 md:px-5 xl:px-6",
        lg: "h-12 md:h-14 xl:h-15 2xl:h-16 3xl:h-18 4xl:h-20 px-6 lg:px-7 xl:px-10 2xl:px-12",
        icon: "h-7 w-7 p-1",
        rounded: "size-6 lg:size-8 xl:size-10 rounded-full p-1.5 lg:p-2 xl:p-3"
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
