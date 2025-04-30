"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Button } from "./button";
import IconClose from "@/shared/icons/close";

type ModalProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (_open: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl";
};

export const Modal = ({ children, open, onOpenChange }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

export const ModalContent = ({
  children,
  size = "md",
  showClose = false
}: {
  children: ReactNode;
  size: "sm" | "md" | "lg" | "xl";
  showClose: boolean;
}) => {
  const sizeClasses = {
    sm: "w-[540px]",
    md: "w-[720px]",
    lg: "w-[920px]",
    xl: "w-[1500px]"
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-secondary-800/40 z-10" />
      <Dialog.Content
        className="fixed inset-0 flex p-4 z-20 h-screen overflow-auto !pointer-events-none"
        aria-describedby=""
      >
        <Dialog.DialogTitle className="sr-only">Authentication Dialog</Dialog.DialogTitle>
        <div
          className={`p-6 bg-accent-white rounded-md shadow-lg max-w-full relative ${
            sizeClasses[size] || "w-auto"
          } m-auto pointer-events-auto`}
        >
          {children}
          {showClose && (
            <Button size="rounded" className="bg-secondary/10 text-secondary p-3 absolute top-4 end-4">
              <IconClose />
            </Button>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export const ModalTrigger = Dialog.Trigger;
export const ModalTitle = Dialog.Title;
export const ModalDescription = Dialog.Description;
export const ModalClose = Dialog.Close;
