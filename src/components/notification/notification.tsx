import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Notification: React.FC = () => {
	return <Toaster position='bottom-center' reverseOrder={false} />;
};

type NotificationType = 'success' | 'error';

export const notify = (message: string, type?: NotificationType, options: any = {}) => {
	const msg = `${message[0].toUpperCase()}${message.substr(1)}`;

	options = {
		icon: false,
		style: {
			background: '#dc3545',
			color: '#FFFFFF'
		},
		...options
	};

	if (type === 'success') {
		toast.success(msg);
	} else if (type === 'error') {
		toast.error(msg);
	} else {
		toast(message, options);
	}
};

export default Notification;
