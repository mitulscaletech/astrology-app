"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Modal = ({ children, open, onOpenChange }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

export const ModalContent = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-secondary-800/40 z-10" />
      <Dialog.Content className="fixed inset-0 flex p-4 z-20 h-screen overflow-auto !pointer-events-none">
        <div className="p-6 bg-accent-white rounded-md shadow-lg max-w-full w-[480px] m-auto pointer-events-auto">
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
