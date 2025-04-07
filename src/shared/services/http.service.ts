import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';

import { API_BASE_URL } from '@/shared/constants';
import { getUrl } from '@/shared/constants/api';
import { IResponseObject } from '@/shared/interface';
import AuthService from './auth.service';

const axiosInstance = axios.create();
let cancel_req: Canceler;

export { cancel_req };

interface IMiscellaneousRequestParams {
	contentType?: string;
	isPublic?: boolean;
	responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
	fullResponse?: boolean;
}

/**
 * get method
 * @param request object containing axios params
 */
const get = (url: string, params: any = {}, otherData: IMiscellaneousRequestParams = {}) =>
	commonAxios({ method: 'GET', url: getUrl(url, params), ...otherData });

/**
 * post method
 * @param request object containing axios params
 */
const post = (url: string, params: any = {}, otherData: IMiscellaneousRequestParams = {}) =>
	commonAxios({ method: 'POST', url: getUrl(url), data: params, ...otherData });

/**
 * put method
 * @param request object containing axios params
 */
const put = (url: string, params: any = {}, otherData: IMiscellaneousRequestParams = {}) =>
	commonAxios({ method: 'PUT', url: getUrl(url), data: params, ...otherData });

/**
 * deleteRequest method
 * @param request object containing axios params
 */
const deleteRequest = (url: string, params: any = {}, otherData: IMiscellaneousRequestParams = {}) =>
	commonAxios({ method: 'DELETE', url: getUrl(url), data: params, ...otherData });

/**
 * patch method
 * @param request object containing axios params
 */
const patch = (url: string, params: any = {}, otherData: IMiscellaneousRequestParams = {}) =>
	commonAxios({ method: 'PATCH', url: getUrl(url), data: params, ...otherData });

interface IAxiosParams extends IMiscellaneousRequestParams {
	method: string;
	url: string;
	data?: any;
}

/**
 * commonAxios
 * @param object containing method, url, data, access token, content-type, isLogin
 */
const commonAxios = (config: IAxiosParams): Promise<any> => {
	const {
		method,
		url,
		data,
		contentType = 'application/json',
		isPublic = false,
		responseType,
		fullResponse = false
	} = config;
	const headers: any = {
		'Content-Type': contentType
	};

	if (!isPublic) {
		const token = AuthService.getAccessToken();
		if (token) {
			headers['access-token'] = `${token}`;
		}
	}

	const body = contentType === 'application/json' ? JSON.stringify(data) : data;

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
				resolve(fullResponse ? response.data : response.data.data);
			})
			.catch((error) => {
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
