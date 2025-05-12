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
export const convertEventsToTimeSlots = (events: any, timeZone = "UTC") => {
  const formatTime = (date: any) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone
    });

  return events.map((event: any) => ({
    start_time: formatTime(new Date(event.start)),
    end_time: formatTime(new Date(event.end))
  }));
};

export function formatDistanceToNow(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    }
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  if (diffInDays < 30) {
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
  }

  if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
}

export function astrologerActiveTab(completedSteps: number): string {
  switch (completedSteps) {
    case 1:
      return "professional";
    case 2:
      return "social";
    case 3:
      return "additional";
    default:
      return "basic-info";
  }
}
export function getCurrentStep(status: string, completed_steps: number, currentStep: number): number {
  return status === USER_PROFILE_STATUS.APPROVED_ACTIVATED
    ? completed_steps
    : (completed_steps ?? currentStep) > currentStep
      ? completed_steps
      : currentStep;
}
export const getFileName = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname; // e.g., /certification/Screenshotfrom2025-05-0610-22-27_d108ae1.png
    const segments = pathname.split("/");
    return segments[segments.length - 1]; // Last part: Screenshotfrom2025-05-0610-22-27_d108ae1.png
  } catch (error) {
    return "";
  }
};
