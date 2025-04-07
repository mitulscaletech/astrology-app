'use client';

import { useMemo } from 'react';

export const useWindow = () => {
	return useMemo(() => {
		if (typeof window !== 'undefined') {
			return window;
		} else {
			return { innerHeight: 1080, innerWidth: 1440 } as Window;
		}
	}, []);
};
