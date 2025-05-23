"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { Controller, type FieldValues, type UseControllerProps } from "react-hook-form";

const CustomRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2 lg:gap-3", className)} {...props} ref={ref} />;
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
        "peer group relative font-medium w-full rounded-lg border-2 border-secondary/30 px-3 md:px-4 xl:px-5 py-2.5 md:py-3 xl:py-3.5 transition-all",
        "data-[state=checked]:border-primary data-[state=checked]:text-primary data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-start gap-x-3 gap-y-2">
        <div className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 group-data-[state=checked]:border-primary group-data-[state=unchecked]:border-secondary/30">
          <RadioGroupPrimitive.Indicator className="h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
        <span>{label}</span>
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
