"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

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

export const ModalContent = ({ children, size = "md" }: { children: ReactNode; size: "sm" | "md" | "lg" | "xl" }) => {
  const sizeClasses = {
    sm: "w-[540px]",
    md: "w-[720px]",
    lg: "w-[920px]",
    xl: "w-[1140px]"
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-secondary-800/40 z-10" />
      <Dialog.Content className="fixed inset-0 flex p-4 z-20 h-screen overflow-auto !pointer-events-none">
        <div
          className={`p-6 bg-accent-white rounded-md shadow-lg max-w-full ${
            sizeClasses[size] || "w-auto"
          } m-auto pointer-events-auto`}
        >
          {children}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export const ModalTrigger = Dialog.Trigger;
export const ModalTitle = Dialog.Title;
export const ModalDescription = Dialog.Description;
export const ModalClose = Dialog.Close;
