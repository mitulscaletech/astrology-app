import { useState, useRef, useEffect } from "react";
import { Cropper, CropperRef, RectangleStencil } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { Modal, ModalContent } from "@/components/ui/modal";

interface IImageCropDialogProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  image: FileList | null;
  confirm: (croppedImageFile: File | null) => void;
  handleDelete: () => void;
}

export default function ImageCropDialog({
  isOpen,
  onClose,
  header,
  image,
  confirm,
  handleDelete
}: IImageCropDialogProps) {
  const cropperRef = useRef<CropperRef>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      return () => URL.revokeObjectURL(url); // Clean up
    }
  }, [image]);

  const handleConfirm = () => {
    // const canvas = cropperRef.current?.getCanvas();
    if (!cropperRef.current || !image || image.length === 0) return;

    const originalFile = image[0];
    const originalName = originalFile.name;

    // Extract name and extension
    const extension = originalName.split(".").pop() || "jpg";
    const baseName = originalName.replace(/\.[^/.]+$/, "");

    const mimeType = originalFile.type || `image/${extension}`;
    const canvas = cropperRef.current.getCanvas({
      width: 1000, // You can increase to get higher-res image
      imageSmoothingQuality: "high",
      fillColor: "#fff" // Useful for JPEG (no alpha)
    });

    canvas?.toBlob((blob) => {
      if (blob) {
        const newFileName = `${baseName}-cropped.${extension}`;
        const file = new File([blob], newFileName, { type: mimeType });
        confirm(file);
      } else {
        confirm(null);
      }
    }, mimeType);
  };
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="sm" showClose>
        <div className="flex flex-col justify-start pb-5 border-b-[1.5px] border-separate-100 mb-8">
          <Typography className="text-secondary text-3.5xl font-bold">{header}</Typography>
        </div>
        {imageUrl ? (
          <div className="mb-8">
            <Cropper
              ref={cropperRef}
              src={imageUrl}
              stencilComponent={RectangleStencil}
              className="w-full h-full rounded-lg"
              style={{ width: "100%", height: "100%" }}
              backgroundClassName="bg-gray-100"
              stencilProps={{ movable: true, resizable: true, aspectRatio: 1 }}
            />
          </div>
        ) : (
          <div className="text-sm text-gray-500 mb-8">No image selected.</div>
        )}
        <div className="flex justify-between gap-3">
          <Button variant="outline" onClick={handleDelete} className="border-secondary text-secondary rounded-xl">
            Delete Photo
          </Button>
          <Button variant="highlight" className="cosmic-button rounded-xl" onClick={handleConfirm}>
            Upload Photo
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
