'use client';

import { useDeferredValue, useMemo, useState } from 'react';

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

export default function App() {
	const [test, setTest] = useState('hello');
	const defferedTest = useDeferredValue(test);
	const lst = useMemo(() => <p>Deffered Value: {defferedTest}</p>, [defferedTest]);
	const utils = trpc.useUtils();
	const queryClient = useQueryClient();
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
