// Source: https://github.com/cosdensolutions/code/blob/master/videos/long/custom-react-hooks-useDebounce/hooks.ts

import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};
