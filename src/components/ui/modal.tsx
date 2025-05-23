"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import IconClose from "@/shared/icons/close";
import Typography from "./typography";

type ModalProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (_open: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl";
};

type ModalTitleProps = {
  children: ReactNode;
  className?: string;
  showClose?: boolean;
};

type ModalDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export const Modal = ({ children, open, onOpenChange }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

export const ModalTitle = ({ children, className = "", showClose = true }: ModalTitleProps) => (
  <Dialog.Title asChild>
    <div
      className={`flex sticky top-0 bg-accent-white/90 backdrop-blur-sm justify-between items-center border-b border-secondary/10 py-2 md:py-3 xl:py-4 2xl:py-5 mb-2 md:mb-3 xl:mb-4 2xl:mb-5 z-10 ${className}`}
    >
      <Typography variant="h3" size="h5" className="font-bold">
        {children}
      </Typography>
      {showClose && (
        <Dialog.Close aria-label="Close">
          <span
            aria-label="close"
            className="block size-6 lg:size-8 xl:size-10 rounded-full p-1.5 lg:p-2 xl:p-3 bg-secondary/10 text-secondary"
          >
            <IconClose />
          </span>
        </Dialog.Close>
      )}
    </div>
  </Dialog.Title>
);

export const ModalDescription = ({ children, className = "" }: ModalDescriptionProps) => (
  <Dialog.Description asChild>
    <div className={`modal-body ${className}`}>{children}</div>
  </Dialog.Description>
);

export const ModalContent = ({ children, size = "md" }: { children: ReactNode; size: "sm" | "md" | "lg" | "xl" }) => {
  const sizeClasses = {
    sm: "w-[540px]",
    md: "w-[720px]",
    lg: "w-[920px]",
    xl: "lg:w-[920px] xl:w-[1024px] 2xl:w-[1240px] 3xl:w-[1500px]"
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-secondary-800/40 z-10" />
      <Dialog.Content
        className="fixed inset-0 flex p-4 z-20 h-screen overflow-auto !pointer-events-none"
        aria-describedby=""
      >
        <div
          className={`p-4 md:p-5 xl:p-6 pt-0 md:pt-0 xl:pt-0 max-h-[90vh] overflow-auto bg-accent-white rounded-lg lg:rounded-xl 2xl:rounded-2xl 3xl:rounded-3xl shadow-lg max-w-full relative ${
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
export const ModalClose = Dialog.Close;
