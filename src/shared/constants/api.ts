import isEmpty from "lodash/isEmpty";
import { register } from "module";
import queryString from "query-string";

// const baseApiVersion = 'api/v1';

const baseUrl = process.env.NEXT_PUBLIC_API || "";

export const API_CONFIG = {
  baseUrl,

  sendOtp: "user/send-otp",
  verifyOtp: "user/verify-otp",
  register: "user/register",
  basicForm: "intake-form/basic",
  professionalForm: "intake-form/professional",
  socialLogin: "user/social-login"
};

export const getUrl = (url: string, params: any = {}): string => {
  if (isEmpty(params)) return url;

  Object.keys(params).forEach((key) => (params[key] === null || params[key] === "") && delete params[key]);
  return `${url}?${queryString.stringify(params)}`;
};
