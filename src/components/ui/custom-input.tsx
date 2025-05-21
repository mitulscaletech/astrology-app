import * as React from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label?: string;
  error?: string;
  className?: string;
  isFloatingLabel?: boolean;
  variant?: "secondary-10" | undefined;
  inputSize?: "sm" | undefined;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, className, error, isFloatingLabel = true, placeholder, inputSize, variant, ...props }, ref) => {
    const id = props.id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <>
        <div className="relative w-full">
          <input
            ref={ref}
            id={id}
            className={cn(
              "peer w-full font-medium rounded-md border-2 px-3 text-base lg:text-lg text-secondary transition-all outline-none",
              // Input Size Variants
              isFloatingLabel ? "pt-6 pb-2 placeholder-transparent" : "placeholder-secondary/70",
              !inputSize && "h-13 md:h-15",
              inputSize === "sm" && "h-10 md:h-13",
              !variant && "bg-accent-white",
              variant === "secondary-10" && "bg-secondary-100 border-secondary-100 focus:border-secondary-100",
              !variant &&
                (error ? "border-primary focus:border-primary-500" : "border-secondary/30 focus:border-secondary"),
              // error ? "border-primary focus:border-primary-500 " : "border-secondary/30 focus:border-secondary",
              "disabled:bg-secondary/20 disabled:cursor-not-allowed",
              className
            )}
            placeholder={placeholder ? placeholder : " "}
            {...props}
          />
          {label && (
            <label
              htmlFor={props.id || label?.toLowerCase().replace(/\s+/g, "-")}
              className={cn(
                "pointer-events-none absolute text-xs text-secondary/50 -translate-y-full md:-translate-y-[125%] top-1/2 z-10 origin-[0] start-3.5 font-medium duration-300 transform",
                "peer-focus:-translate-y-full md:peer-focus:-translate-y-[125%] peer-focus:text-secondary peer-focus:text-xs",
                "peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base"
              )}
            >
              {label}
            </label>
          )}
        </div>
        {error && <p className="mt-0.5 ml-1 text-sm text-primary">{error}</p>}
      </>
    );
  }
);

InputField.displayName = "InputField";
