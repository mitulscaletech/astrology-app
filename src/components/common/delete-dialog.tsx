import { Modal, ModalContent } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { IconDelete } from "@/shared/icons/delete";
import Typography from "../ui/typography";

interface IDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  description: string;
  confirm: () => void;
}

export default function DeleteDialog({ isOpen, onClose, header, description, confirm }: IDeleteDialogProps) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="sm" showClose>
        <div className="flex flex-col justify-start mb-15">
          <div className="flex items-center gap-2.5">
            <span className="size-6">
              <IconDelete />
            </span>
            <Typography className="text-secondary text-3.5xl font-bold">{header}</Typography>
          </div>
          <Typography size="p" className="text-secondary text-lg font-normal">
            {description}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose} className="border-secondary text-secondary rounded-xl">
            CANCEL
          </Button>
          <Button variant="highlight" className="cosmic-button rounded-xl" onClick={confirm}>
            Delete
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
