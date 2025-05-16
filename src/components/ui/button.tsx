import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex text-xs md:text-sm lg:text-small border-2 xl:text-base 2xl:text-lg gap-1 md:gap-1.5 2xl:gap-2.5 items-center justify-center tracking-[0.04em] uppercase whitespace-nowrap rounded-md font-semibold ring-offset-secondary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-100 hover:bg-highlight border-transparent",
        danger: "bg-danger text-danger-800 hover:bg-danger/90 border-transparent",
        highlight: "bg-highlight text-accent-white hover:bg-primary hover:text-accent-white border-transparent",
        white: "bg-accent-white text-secondary hover:bg-secondary hover:text-accent-white border-transparent",
        outline: "border-primary text-primary bg-accent-white hover:bg-primary hover:text-accent-white",
        "outline-secondary":
          "border-secondary text-secondary bg-accent-white hover:bg-secondary hover:text-accent-white",
        secondary: "bg-secondary text-secondary-100 hover:bg-secondary/80 border-transparent",
        ghost: "hover:bg-primary hover:text-accent-white border-transparent",
        link: "text-primary underline-offset-4 hover:underline border-transparent",
        icon: "border border-secondary/30 bg-transparent hover:bg-secondary/5 hover:border-secondary/50"
      },
      size: {
        default: "h-10 md:h-12 xl:h-13 2xl:h-15 4xl:h-16 px-5 lg:px-6 xl:px-8 2xl:px-12 py-2",
        sm: "h-9 md:h-11 xl:h-12 rounded-md px-4 md:px-5 xl:px-6",
        lg: "h-12 md:h-14 xl:h-15 2xl:h-16 3xl:h-18 4xl:h-20 px-6 lg:px-7 xl:px-10 2xl:px-12",
        icon: "h-7 w-7 p-1",
        rounded: "size-10 lg:size-12 rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

const Spinner = () => (
  <span
    className="block absolute start-1/2 top-1/2 -m-2 xl:-m-2.5 size-4 xl:size-5 border-2 border-current border-t-transparent rounded-full animate-spin align-middle"
    aria-label="Loading"
  />
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const buttonClasses = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      const child = React.Children.only(children);
      return React.cloneElement(child as React.ReactElement, {
        className: cn(buttonClasses, (child as React.ReactElement).props.className),
        disabled: isLoading || props.disabled,
        ...props,
        children: (
          <>
            {isLoading && <Spinner />}
            <span className={isLoading ? "opacity-0" : ""}>{(child as React.ReactElement).props.children}</span>
          </>
        )
      });
    }

    return (
      <Comp className={buttonClasses} ref={ref} disabled={isLoading || props.disabled} {...props}>
        {isLoading && <Spinner />}
        <span className={isLoading ? "opacity-0" : ""}>{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
