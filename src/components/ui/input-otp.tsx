"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "@/lib/utils";

// ✅ Reusable OTP Input Component
const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
);
InputOTP.displayName = "InputOTP";

// ✅ OTP Group (Container)
const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-1 justify-between", className)} {...props} />
  )
);
InputOTPGroup.displayName = "InputOTPGroup";

// ✅ Individual OTP Slot
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex size-10 md:size-12 xl:size-14 3xl:size-15 items-center justify-center rounded-md text-lg font-medium shadow-sm transition-all",
        "border-2 border-secondary/30 bg-accent-white text-secondary focus:outline-none focus:ring-0",
        isActive && "ring-1 ring-secondary ring-offset-1",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-[2px] animate-caret-blink bg-gray-900 dark:bg-accent-white duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

// ✅ Separator Between OTP Slots
const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("mx-2 text-gray-500", className)} {...props}>
      <span className="h-2.5 w-2.5 rounded-full bg-current" />
    </div>
  )
);
InputOTPSeparator.displayName = "InputOTPSeparator";

// ✅ Export All Components
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
