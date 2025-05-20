"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { Controller, type FieldValues, type UseControllerProps } from "react-hook-form";

const CustomRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
CustomRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface CustomRadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label: string;
}

const CustomRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  CustomRadioGroupItemProps
>(({ className, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "peer relative w-full rounded-lg border-2 border-secondary/30 p-5 transition-all",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-5 w-5 items-center justify-center rounded-full border data-[state=checked]:border-primary data-[state=unchecked]:border-secondary/30">
          <RadioGroupPrimitive.Indicator className="h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
        <span className={cn("font-medium", props.checked ? "text-primary" : "text-secondary")}>{label}</span>
      </div>
    </RadioGroupPrimitive.Item>
  );
});
CustomRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// Form-compatible version
interface FormCustomRadioGroupProps<T extends FieldValues> extends UseControllerProps<T> {
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
}

function FormCustomRadioGroup<T extends FieldValues>({
  control,
  name,
  options,
  className,
  ...props
}: FormCustomRadioGroupProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <CustomRadioGroup onValueChange={field.onChange} defaultValue={field.value} className={className} {...props}>
          {options.map((option) => (
            <CustomRadioGroupItem
              key={option.value}
              value={option.value}
              label={option.label}
              id={`${name}-${option.value}`}
            />
          ))}
        </CustomRadioGroup>
      )}
    />
  );
}

export { CustomRadioGroup, CustomRadioGroupItem, FormCustomRadioGroup };
