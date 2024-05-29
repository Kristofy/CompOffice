'use client';

import { useDeferredValue, useMemo, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import { trpc } from '@/trpc/client/client';
import { useQueryClient } from '@tanstack/react-query';
import ThemeChanger from './theme-changer';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { set } from 'zod';

export default function App() {
	// Get the query params
	const params = useSearchParams();
	const errorHandled = useRef(false);
	const router = useRouter();;

	const session = useSession();
	const [test, setTest] = useState('hello');
	const defferedTest = useDeferredValue(test);
	const lst = useMemo(() => <p>Deffered Value: {defferedTest}</p>, [defferedTest]);
	const utils = trpc.useUtils();
	const queryClient = useQueryClient();

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
			<Input value={test} onChange={(e) => setTest(e.target.value)} />
			<Button
				onClick={() => {
					queryClient.clear();
					console.log('invalidated');
				}}>
				Reset
			</Button>
			<ThemeChanger />
			<Button
				onClick={() => {
					if (session.data?.user.role) {
						session.data.user.role--;
					}
				}}>
			</Button>
			<h1>
				Roles: {session.data?.user?.role_name} {session.data?.user?.role}
				Name: {session.data?.user?.name}
				Email {session.data?.user?.email}
			</h1>
			{lst}
			<hr />
			<ContextMenu>
				<ContextMenuTrigger>Test</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem inset onSelect={() => console.log('Cicked')}>
						Copy
					</ContextMenuItem>
					<ContextMenuItem inset onSelect={() => console.log('Cicked')}>
						Edit
					</ContextMenuItem>
					<ContextMenuItem inset onSelect={() => console.log('Cicked')}>
						New
					</ContextMenuItem>
					<ContextMenuItem inset onSelect={() => console.log('Cicked')}>
						New
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</>
	);
}
