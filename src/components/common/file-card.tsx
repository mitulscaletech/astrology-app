import React from "react";

import Typography from "@/components/ui/typography";

import { IconEdit, IconEye, IconFile } from "@/shared/icons/my-profile";

interface IFileCardProps {
  name: string;
  [key: string]: any;
}
const FileCard: React.FC<IFileCardProps> = ({ name, ...props }) => {
  return (
    <div className="flex justify-between py-3 px-8 border-2 rounded-md border-primary/30 h-18">
      <div className="flex items-center gap-2">
        <span className="size-6 ms-auto">
          <IconFile />
        </span>
        <Typography size="p" className="text-primary text-lg font-medium">
          {name}
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        <span className="size-6 ms-auto cursor-pointer hover:bg-primary/10 rounded-full">
          <IconEye />
        </span>
        <span className="size-6 ms-auto cursor-pointer hover:bg-primary/10 rounded-full">
          <IconEdit />
        </span>
      </div>
    </div>
  );
};
export default FileCard;
