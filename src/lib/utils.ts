/* eslint-disable indent */
import { clsx, type ClassValue } from "clsx";
import { API_CONFIG } from "@/shared/constants/api";
import { USER_PROFILE_STATUS } from "@/shared/constants";
import HttpService from "@/shared/services/http.service";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { IMediaFile } from "next-auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleUploadMedia = async (file: File[], mediaType: string) => {
  if (file && file.length === 0) {
    const formData = new FormData();
    formData.append("media_file", file[0]);
    formData.append("media_type", mediaType);
    return await HttpService.post(API_CONFIG.uploadMedia, formData, {
      contentType: "multipart/form-data"
    });
  }
};

export const handleUserStatusRedirect = (status: string): string | undefined => {
  switch (status) {
    case USER_PROFILE_STATUS.APPROVED_ACTIVATED:
      toast.success("Login successfully!");
      return "/astrologer/dashboard";

    case USER_PROFILE_STATUS.PENDING_PROFILE_COMPLETION:
      return "/astrologer/onboarding";

    case USER_PROFILE_STATUS.PROFILE_INCOMPLETE:
      return "/astrologer/profile";

    case USER_PROFILE_STATUS.AWAITING_FINAL_REVIEW:
      return "/astrologer/awaiting-review";

    case USER_PROFILE_STATUS.REJECTED:
      toast.error("Your account is rejected. Please contact to Admin");
      break;

    default:
      toast.error("Your account is not activated yet. Please contact to Admin");
      break;
  }
};
export const getMediaFile = (mediaFiles: IMediaFile[], type: string) => {
  const mediaFile = mediaFiles.find((file: any) => file.media_type === type);
  return mediaFile ? mediaFile.s3_path : "";
};
