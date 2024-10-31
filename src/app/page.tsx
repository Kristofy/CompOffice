'use client';

import { useDeferredValue, useMemo, useRef, useState } from 'react';
import { trpc } from '@/trpc/client/client';
import { useQueryClient } from '@tanstack/react-query';
import ThemeChanger from './theme-changer';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function App() {
	const params = useSearchParams();
	const errorHandled = useRef(false);
	const router = useRouter();;

	if (params.has('error') && !errorHandled.current) {
		const error = params.get('error');
		toast.error(error);
		errorHandled.current = true;
		router.push('/');
		return;
	}

	if (!params.has('error')) {
		errorHandled.current = false;
	}

	return (
		<>

		</>
	);
}
