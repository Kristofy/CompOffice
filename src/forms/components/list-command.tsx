'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command';

export default function ListCommand({
	onOpenChange,
	selectedCommand,
	setSelectCommand,
	commandNames,
}: {
	onOpenChange: (open: boolean) => void;
	selectedCommand: string;
	setSelectCommand: (command: string) => void;
	commandNames: string[];
}) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<CommandDialog open={open} onOpenChange={onOpenChange}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>{selectedCommand} Does not exits</CommandEmpty>
				<CommandGroup heading="Properties">
					{commandNames.map((key) => (
						<CommandItem key={key} onSelect={() => setSelectCommand(key)}>
							<span>{key}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
