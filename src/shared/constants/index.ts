import moment from "moment";
import { IOption } from "next-auth";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const DEFAULT_COUNTRY_CODE = "+91";
export const USER_PROFILE_STATUS = {
  PENDING_PROFILE_COMPLETION: "Pending Basic Information",
  PROFILE_INCOMPLETE: "Pending Profile Completion",
  AWAITING_FINAL_REVIEW: "Awaiting Final Review",
  APPROVED_ACTIVATED: "Approved & Activated",
  REJECTED: "Rejected"
};
export const ROLE = {
  user: "USER",
  admin: "ADMIN",
  astrologer: "ASTROLOGER"
};
export const GENDER_OPTIONS: IOption[] = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" }
];
export const HIGHTEST_QUALIFICATION: IOption[] = [
  { value: "graduate", label: "Graduate" },
  { value: "post-graduate", label: "Post Graduate" },
  { value: "diploma", label: "Diploma" }
];
export const LANGUAGE_OPTIONS: IOption[] = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "gujarati", label: "Gujarati" }
];
export const DEFAULT_ADULT_AGE = moment().subtract(18, "years").toDate();
export const LOGIN_ANIMATION_VARIANTS = {
  initial: {
    rotateY: 90,
    opacity: 0
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  exit: {
    rotateY: -90,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

export const DAYS_FILTER_OPTION = [
  { value: "7", label: "Last 7 Days" },
  { value: "14", label: "Last 14 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "60", label: "Last 60 Days" }
];
export const IMAGE_MIME_TYPE = ".jpeg,.png,.jpg";
