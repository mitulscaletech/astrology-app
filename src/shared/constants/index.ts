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
  { value: "spanish", label: "Spanish" }
];
export const DEFAULT_ADULT_AGE = moment().subtract(18, "years").toDate();
