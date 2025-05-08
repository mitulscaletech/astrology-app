"use client";
import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils"; // optional utility for className merging

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuContent = ({ className, ...props }: DropdownMenuPrimitive.DropdownMenuContentProps) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-lg py-3 border border-secondary-100 bg-accent-white text-sm shadow-lg",
        className
      )}
      sideOffset={8}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuItem = ({ className, ...props }: DropdownMenuPrimitive.DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "cursor-pointer font-medium w-full px-4 py-2 text-primary hover:bg-primary hover:text-accent-white outline-none flex text-base",
      className
    )}
    {...props}
  />
);

export const DropdownMenuSeparator = ({ className, ...props }: DropdownMenuPrimitive.DropdownMenuSeparatorProps) => (
  <DropdownMenuPrimitive.Separator className={cn("my-1 h-px bg-secondary-200", className)} {...props} />
);

export const DropdownMenuSubTrigger = ({
  className,
  children,
  ...props
}: DropdownMenuPrimitive.DropdownMenuSubTriggerProps) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      "flex items-center justify-between px-4 py-2 rounded-md text-black hover:bg-primary-100 hover:text-white cursor-pointer outline-none",
      className
    )}
    {...props}
  >
    {children}
    <svg
      className="ml-auto h-3 w-3 text-muted-foreground"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </DropdownMenuPrimitive.SubTrigger>
);

export const DropdownMenuSubContent = ({ className, ...props }: DropdownMenuPrimitive.DropdownMenuSubContentProps) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent
      className={cn(
        "z-50 flex flex-col min-w-[12rem] overflow-hidden rounded-xl border border-secondary-100 bg-accent-white p-1 text-sm shadow-lg",
        className
      )}
      sideOffset={8}
      alignOffset={-4}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);
