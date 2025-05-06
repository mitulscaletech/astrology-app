import * as React from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  multiple?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, className, error, multiple = false, ...props }, ref) => {
    const id = props.id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <>
        <div className="relative w-full">
          <input
            ref={ref}
            id={id}
            className={cn(
              "peer h-16 w-full font-medium rounded-md border-2 px-3 pt-6 pb-2 text-base lg:text-lg text-secondary placeholder-transparent transition-all outline-none",
              error ? "border-primary focus:border-primary-500 " : "border-secondary/30 focus:border-secondary",
              className
            )}
            multiple={multiple}
            placeholder=""
            {...props}
          />

          <label
            htmlFor={props.id || label.toLowerCase().replace(/\s+/g, "-")}
            className={cn(
              "pointer-events-none absolute text-base text-secondary/50 -translate-y-full top-1/2 z-10 origin-[0] start-3 font-medium duration-300 transform",
              "peer-focus:-translate-y-full peer-focus:text-secondary",
              "peer-placeholder-shown:-translate-y-1/2"
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

InputField.displayName = "InputField";
