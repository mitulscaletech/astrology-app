import * as React from "react";
import { cn } from "@/lib/utils";
import IconCheck from "@/shared/icons/check";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, children, ...props }, ref) => {
  return (
    <label className="flex gap-1.5 md:gap-2 2xl:gap-3 items-center cursor-pointer">
      <input ref={ref} type="checkbox" className={cn("peer hidden", className)} {...props} />
      <span
        className={cn(
          "size-5 inline-flex items-center justify-center rounded-sm transition-all",
          "border-2 border-secondary/70 bg-accent-white text-transparent",
          "peer-checked:border-secondary peer-checked:text-secondary",
          "peer-focus:ring-2 peer-focus:ring-secondary peer-focus:ring-offset-2",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-disabled:bg-secondary/20"
        )}
      >
        <span className="size-3.5">
          <IconCheck />
        </span>
      </span>
      {children && <span className="text-secondary/70">{children}</span>}
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
