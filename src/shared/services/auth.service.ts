"use client";

import CryptoJS from "crypto-js";
import { IUserData } from "../interface";

const KEY = process.env.NEXT_PUBLIC_ENCRYPTION_API_KEY || "";
let token = "";

/**
 * Check if user is logged in.
 */
export const checkLogin = (): boolean =>
  typeof window !== "undefined" && !!localStorage.authInfo && !!localStorage.userInfo;

/**
 * Get user access token.
 */
const getAccessToken = (): boolean | string => {
  if (token) return token;
  try {
    const data = typeof window !== "undefined" && localStorage.authInfo;
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData && decryptedData.token ? decryptedData.token : false;
    }
    return false;
  } catch (e) {
    return false;
  }
};

/**
 * Get user data.
 */
const getUserData = (): IUserData => {
  try {
    const data = typeof window !== "undefined" && localStorage.userInfo;
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
      const decryptedData: IUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData || ({} as IUserData);
    }
    return {} as IUserData;
  } catch (error) {
    return {} as IUserData;
  }
};

/**
 * Set user authentication data.
 */
const setAuthData = async (data: IUserData): Promise<void> => {
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
  if (typeof window !== "undefined") {
    localStorage.setItem("authInfo", cipherText.toString());
  }
};

/**
 * Set user detail.
 */
const setUserData = (data: IUserData): void => {
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
  if (typeof window !== "undefined") {
    localStorage.setItem("userInfo", cipherText.toString());
  }
};

/**
 * Remove user authentication data.
 */
const removeAuthData = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authInfo");
    localStorage.removeItem("userInfo");
  }
  token = "";
};

/**
 * Generate user hash.
 */
const generateUserHash = (id: string): string => {
  const hash = CryptoJS.HmacSHA256(id, "kYeOTa2xx3DxKjsLB9cJj43k7ZrdZk5XsijucP8N");
  return CryptoJS.enc.Hex.stringify(hash);
};

const AuthService = {
  checkLogin,
  getAccessToken,
  setAuthData,
  removeAuthData,
  setUserData,
  getUserData,
  generateUserHash
};
export default AuthService;
