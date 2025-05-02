// components/InputField.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, className, error, ...props }, ref) => {
    const id = props.id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          id={id}
          className={cn(
            "peer h-14 w-full rounded-md border-2 px-3 pt-5 text-base lg:text-lg text-secondary-800 placeholder-transparent transition-all outline-none",
            error
              ? "border-primary focus:border-primary-500 focus:ring-primary-300"
              : "border-secondary/30 focus:border-secondary focus:ring-gray-400",
            className
          )}
          placeholder={label}
          {...props}
        />

        <label
          htmlFor={props.id || label.toLowerCase().replace(/\s+/g, "-")}
          className={cn(
            "absolute left-3 top-3 text-xs text-secondary/70 transition-all pointer-events-none",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-secondary-400",
            "peer-focus:top-3 peer-focus:text-secondary-500"
          )}
        >
          {label}
        </label>
        {error && <p className="mt-0.5 ml-1 text-sm text-primary">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
