// components/cancel-modal.tsx

import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalDescription, ModalTitle } from "@/components/ui/modal";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const CancelModal = ({ open, onCancel, onConfirm }: Props) => {
  return (
    <Modal open={open} onOpenChange={onCancel}>
      <ModalContent>
        <ModalTitle className="text-lg font-semibold">Cancel Session</ModalTitle>
        <ModalDescription className="text-sm text-muted-foreground mt-2">
          Are you sure you want to cancel this session? This action cannot be undone.
        </ModalDescription>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            No, keep it
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Yes, cancel
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
