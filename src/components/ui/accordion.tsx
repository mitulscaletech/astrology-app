import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import React from "react";
import Typography from "@/components/ui/typography";
import IconArrowDownward from "@/shared/icons/arrow-downward";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b-2 border-secondary/20 mb-3 md:mb-4 xl:mb-5", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header asChild>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex gap-2 w-full items-center justify-between py-3 md:py-4 lg:py-4 2xl:py-5 3xl:py-6 font-semibold transition-all text-start data-[state=open]:text-primary",
        className
      )}
      {...props}
    >
      <Typography variant="span" size="h5">
        {children}
      </Typography>
      <span className="size-5 md:size-6 xl:size-8 2xl:size-10 transition-transform duration-200 group-data-[state=open]:rotate-180">
        <IconArrowDownward />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn("text-secondary/70 text-base md:text-lg lg:text-xl xl:text-2xl pb-6", className)}
    {...props}
  />
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
