// components/FileUpload.tsx
import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { UploadCloud } from "lucide-react";

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
        <div className="flex flex-col items-center justify-center space-y-1">
          <span className="text-xs text-secondary/70 font-medium">{label}</span>
          <div className="flex items-center gap-1 justify-center space-y-1">
            <UploadCloud className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>
        </div>
        <input id={name} type="file" multiple={multiple} accept={accept} {...register} className="hidden" {...props} />
      </label>
      {error && <p className="mt-0.5 ml-1 text-sm text-primary">{error.message}</p>}
    </div>
  );
};

export default FileUpload;
