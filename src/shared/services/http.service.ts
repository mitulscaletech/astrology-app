import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from "axios";

import { API_BASE_URL } from "@/shared/constants";
import { getUrl } from "@/shared/constants/api";
import { IResponseObject } from "@/shared/interface";
import { getSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

const axiosInstance = axios.create();
let cancel_req: Canceler;
export { cancel_req };

interface IMiscellaneousRequestParams {
  contentType?: string;
  isPublic?: boolean;
  responseType?: "arraybuffer" | "blob" | "json" | "text";
  fullResponse?: boolean;
}

/**
 * get method
 * @param request object containing axios params
 */
const get = (url: string, params: any = {}, otherData: IMiscellaneousRequestParams = {}) =>
  commonAxios({ method: "GET", url: getUrl(url, params), ...otherData });

/**
 * post method
 * @param request object containing axios params
 */
const post = (url: string, params: any = {}, otherData: IMiscellaneousRequestParams = {}) =>
  commonAxios({ method: "POST", url: getUrl(url), data: params, ...otherData });

/**
 * put method
 * @param request object containing axios params
 */
const put = (url: string, params: any = {}, otherData: IMiscellaneousRequestParams = {}) =>
  commonAxios({ method: "PUT", url: getUrl(url), data: params, ...otherData });

/**
 * deleteRequest method
 * @param request object containing axios params
 */
const deleteRequest = (url: string, params: any = {}, otherData: IMiscellaneousRequestParams = {}) =>
  commonAxios({ method: "DELETE", url: getUrl(url), data: params, ...otherData });

/**
 * patch method
 * @param request object containing axios params
 */
const patch = (url: string, params: any = {}, otherData: IMiscellaneousRequestParams = {}) =>
  commonAxios({ method: "PATCH", url: getUrl(url), data: params, ...otherData });

interface IAxiosParams extends IMiscellaneousRequestParams {
  method: string;
  url: string;
  data?: any;
}

/**
 * commonAxios
 * @param object containing method, url, data, access token, content-type, isLogin
 */
const commonAxios = async (config: IAxiosParams): Promise<any> => {
  const { method, url, data, contentType = "application/json", isPublic = false, responseType } = config;
  const headers: any = {
    "Content-Type": contentType
  };

  if (!isPublic) {
    const session = await getSession();
    const token = session?.user.access_token;
    console.log("token", token);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const body = contentType === "application/json" ? JSON.stringify(data) : data;

  const axiosInstanceParams: AxiosRequestConfig = {
    method: method,
    baseURL: API_BASE_URL,
    url: url,
    cancelToken: new axios.CancelToken(function executor(c) {
      cancel_req = c;
    }),
    headers: headers,
    data: body,
    responseType: responseType
  };

  return new Promise((resolve, reject) => {
    axiosInstance(axiosInstanceParams)
      .then((response: AxiosResponse<IResponseObject<any>>) => {
        // resolve(fullResponse ? response.data : response.data.data);
        resolve(response.data);
      })
      .catch((error) => {
        const res = error.response;
        if (res && res.data && res.status) {
          const status = res.status;
          const responseData = res.data;
          if ((status === 401 || status === 403) && responseData) {
            signOut();
            window.location.pathname = "/astrologer/login";
          }
          toast.error(responseData.message);
          reject(error);
        }
        reject(error);
      });
  });
};

export { axiosInstance };

const HttpService = {
  get,
  post,
  put,
  deleteRequest,
  patch
};

export default HttpService;
