import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-15 w-full rounded-md border-2 border-secondary/30 bg-accent-white px-3 py-2 text-base md:text-md lg:text-lg xl:text-xl focus:border-secondary ring-0 ring-offset-secondary placeholder:text-secondary/30 focus-visible:outline-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
