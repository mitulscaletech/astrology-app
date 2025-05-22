// components/FileUpload.tsx
import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import IconDownload from "@/shared/icons/download";

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  title: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  accept?: string;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  title,
  name,
  register,
  error,
  accept = ".pdf,.jpg,.jpeg,.png", // default allowed file types
  multiple = false,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={name}
        className={`border-[1.5px] border-dashed rounded-md border-secondary/30 p-3 text-center cursor-pointer hover:bg-gray-50 transition-all duration-150 ${
          error ? "border-primary-500" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-secondary/70 font-medium mb-0.5">{label}</span>
          <div className="flex items-center gap-1.5 justify-center">
            <span className="size-5 lg:size-6">
              <IconDownload />
            </span>
            <span className="font-medium">{title}</span>
          </div>
        </div>
        <input id={name} type="file" multiple={multiple} accept={accept} {...register} className="hidden" {...props} />
      </label>
      {error && <p className="mt-0.5 ml-1 text-sm text-primary">{error.message}</p>}
    </div>
  );
};

export default FileUpload;
