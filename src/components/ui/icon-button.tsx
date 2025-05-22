import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex text-xs md:text-sm lg:text-small border-2 xl:text-base 2xl:text-lg gap-1 md:gap-1.5 2xl:gap-2.5 items-center justify-center tracking-[0.04em] uppercase whitespace-nowrap font-semibold ring-offset-secondary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full relative",
  {
    variants: {
      variant: {
        default: "bg-secondary/10 text-secondary hover:bg-secondary/20 border-transparent",
        "primary-10": "bg-primary/10 text-primary hover:bg-primary/20 border-transparent"
      },
      size: {
        default: "size-12",
        sm: "size-10"
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

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
            <span className={isLoading ? "opacity-0" : "inline-flex m-auto size-1/2"}>
              {(child as React.ReactElement).props.children}
            </span>
          </>
        )
      });
    }

    return (
      <Comp className={buttonClasses} ref={ref} disabled={isLoading || props.disabled} {...props}>
        {isLoading && <Spinner />}
        <span className={isLoading ? "opacity-0" : "inline-flex m-auto size-1/2"}>{children}</span>
      </Comp>
    );
  }
);
IconButton.displayName = "Button";

export { IconButton, buttonVariants };
