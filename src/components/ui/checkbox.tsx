import * as React from "react";
import { cn } from "@/lib/utils";
import IconCheck from "@/shared/icons/check";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input ref={ref} type="checkbox" className={cn("peer hidden", className)} {...props} />
      <span
        className={cn(
          `h-4 w-4 inline-flex items-center justify-center 
             rounded-sm border border-primary 
             bg-background text-background 
             peer-checked:bg-primary peer-checked:text-primary-foreground 
             peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2 
             disabled:cursor-not-allowed disabled:opacity-50 
             transition-all`
        )}
      >
        <span className="h-3 w-3">
          <IconCheck />
        </span>
      </span>
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
