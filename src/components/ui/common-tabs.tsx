import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CommonTabs = TabsPrimitive.Root;

const CommonTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  // Find the active tab for indicator animation
  const tabsArray = React.Children.toArray(children);
  const activeIndex = tabsArray.findIndex((child: any) => child?.props?.["data-state"] === "active");

  return (
    <div className={cn("relative w-full mb-6")}>
      {/* relative for indicator */}
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "flex w-full border gap-1 xl:gap-1.5 border-secondary/30 rounded-xl overflow-hidden bg-white p-1.5",
          className
        )}
        {...props}
      >
        {tabsArray}
      </TabsPrimitive.List>
      {/* Animated pill indicator */}
      {activeIndex !== -1 && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute top-1 left-0 h-[calc(100%-0.5rem)] bg-primary rounded-xl z-0"
          style={{
            width: `calc((100% - 0.5rem * ${tabsArray.length - 1}) / ${tabsArray.length})`,
            transform: `translateX(calc(${activeIndex} * (100% / ${tabsArray.length})))`,
            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)"
          }}
        />
      )}
    </div>
  );
});
CommonTabsList.displayName = TabsPrimitive.List.displayName;

const CommonTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex-1 py-3 text-lg font-semibold transition-all focus:outline-none rounded-xl relative z-10",
      "data-[state=active]:bg-primary data-[state=active]:!text-primary-100",
      "data-[state=inactive]:bg-white data-[state=inactive]:text-primary",
      className
    )}
    {...props}
  />
));
CommonTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const CommonTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} {...props}>
    <AnimatePresence mode="wait">
      <motion.div
        key={props.value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className={cn(
          "mt-2 ring-offset-secondary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2",
          className
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </TabsPrimitive.Content>
));
CommonTabsContent.displayName = TabsPrimitive.Content.displayName;

export { CommonTabs, CommonTabsList, CommonTabsTrigger, CommonTabsContent };
