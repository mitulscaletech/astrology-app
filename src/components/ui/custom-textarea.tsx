import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  className?: string;
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, className, error, ...props }, ref) => {
    const id = props.id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <>
        <div className="relative w-full">
          <textarea
            ref={ref}
            id={id}
            rows={4}
            className={cn(
              "peer w-full font-medium rounded-md border-2 px-3 pt-6 pb-2 text-base lg:text-lg text-secondary placeholder-transparent transition-all outline-none resize-none",
              error ? "border-primary focus:border-primary-500" : "border-secondary/30 focus:border-secondary",
              className
            )}
            placeholder=" "
            {...props}
          />

          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-3 top-2 text-base text-secondary/50 transform origin-[0] transition-all duration-300",
              "peer-placeholder-shown:top-5 peer-placeholder-shown:text-base",
              "peer-focus:top-2 peer-focus:text-sm peer-focus:text-secondary"
            )}
          >
            {label}
          </label>
        </div>
        {error && <p className="mt-0.5 ml-1 text-sm text-primary">{error}</p>}
      </>
    );
  }
);

TextareaField.displayName = "TextareaField";
