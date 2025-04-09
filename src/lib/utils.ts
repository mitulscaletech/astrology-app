import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleUploadMedia = async (file: File[], mediaType: string) => {
  const formData = new FormData();
  formData.append("media_file", file[0]);
  formData.append("media_type", mediaType);
  return await HttpService.post(API_CONFIG.uploadMedia, formData, {
    contentType: "multipart/form-data"
  });
};
