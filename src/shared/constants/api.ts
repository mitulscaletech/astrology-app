import isEmpty from "lodash/isEmpty";
import queryString from "query-string";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API_CONFIG = {
  baseUrl,
  me: "user",
  updateProfile: "user/update-profile",
  sendOtp: "user/send-otp",
  verifyOtp: "user/verify-otp",
  register: "user/register",
  intakeForm: "intake-form",
  socialLogin: "user/social-login",
  uploadMedia: "media",
  setAvailability: "astrologer-schedules",
  verifyCaptcha: "user/verify-recaptcha",
  astrologerList: "astrologer",
  booking: "booking"
};

export const getUrl = (url: string, params: any = {}): string => {
  if (isEmpty(params)) return url;

  Object.keys(params).forEach((key) => (params[key] === null || params[key] === "") && delete params[key]);
  return `${url}?${queryString.stringify(params)}`;
};
