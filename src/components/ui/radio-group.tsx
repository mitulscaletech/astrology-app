"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  value: string;
  name: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("grid gap-2", className)} {...props}>
    {children}
  </div>
));
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, label, ...props }, ref) => {
    const id = React.useId();
    return (
      <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer">
        <input ref={ref} type="radio" id={id} className={cn("peer hidden", className)} {...props} />
        <span
          className={cn(
            `relative h-4 w-4 rounded-full border border-primary 
            flex items-center justify-center 
            ring-offset-background 
            peer-checked:border-4 peer-checked:border-primary 
            peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2 
            disabled:cursor-not-allowed disabled:opacity-50 transition`
          )}
        >
          {/* Inner dot using pseudo-circle */}
          <span className="absolute h-2 w-2 rounded-full bg-primary peer-checked:scale-100 scale-0 transition-transform" />
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
