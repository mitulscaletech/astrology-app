'use client';

import { FC, useCallback, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '@/shared/services/http.service';
import Notification, { notify } from '@/components/notification/notification';

import { IResponseObject } from '@/shared/interface';
import AuthService from '@/shared/services/auth.service';

const ErrorHandler: FC = () => {
	const logout = useCallback(() => {
		AuthService.removeAuthData();
	}, []);

	useEffect(() => {
		const resInterceptor = axiosInstance.interceptors.response.use(
			(res: AxiosResponse<IResponseObject<any>>) => {
				const { data } = res;
				if (data && data.message) {
					if (data.isError) {
						notify(data.message, 'error');
						throw new Error(data.message as string);
					} else {
						notify(data.message, 'success');
					}
				}
				return res;
			},
			(error: any) => {
				const res = error.response.data.error;
				const status = error.response.data.error.status;
				// check if error is having data
				if (res && status) {
					// is http error code is 401, log out of the application
					if (status === 401 && res) {
						logout();
						notify(res.message, 'error');
					} else if (res && res.message) {
						// if error data contains message field, add error notification
						notify(res.message, 'error');
					} else {
						notify(error.message, 'error');
					}
					throw error;
				}
			}
		);

		return () => axiosInstance.interceptors.response.eject(resInterceptor);
	}, [logout]);

	return <Notification />;
};

export default ErrorHandler;
