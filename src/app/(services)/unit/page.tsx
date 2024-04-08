'use client';

import { useCallback, useMemo, useState } from 'react';

import toast from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DataHandlerForm from '@/forms/components/form/data-handler-form';
import { ContextMenuField } from '@/forms/components/table/data-handler-list';
import DataHandlerTable from '@/forms/components/table/data-handler-table';
import { unitValidator } from '@/forms/schemas/services';
import { unit } from '@prisma/client';

// Defautl on row click will Pull up a dialog
export function DefaultFormDialog<T extends object>(data: T & Record<string, any>) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Share</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
					</div>
					<Button type="submit" size="sm" className="px-3">
						<span className="sr-only">Copy</span>
					</Button>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default function UnitPage() {
	console.log('update unit page');
	const [open, setOpen] = useState(false);

	const handleRowClick = useCallback((data: unit & Record<string, any>, index: number) => {
		console.log('Row Click', data, index);
		setOpen(true);
	}, []);

	const handleSubmit = useCallback((data: z.infer<typeof unitValidator.schema.form>) => {
		console.log(data);
	}, []);

	const contextMenu: ContextMenuField<unit>[] = useMemo(
		() => [
			{
				name: 'Copy',
				onClick: (data, key) => {
					navigator.clipboard.writeText(data[key]);
				},
			},
			{
				name: 'Delete',
				onClick: (data, key) => {
					console.log('Delete', data, key);
				},
			},
			{
				name: 'Edit',
				onClick: (data, key) => {
					console.log('Edit', data, key);
					toast.success(`Editing ${data}`);
				},
			},
			{
				name: 'View',
				onClick: (data, key) => {
					console.log('View', data, key);
				},
			},
			{
				name: 'New',
				onClick: (data, key) => {
					console.log('New', data, key);
				},
			},
		],
		[]
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DataHandlerTable
				dataHandler={unitValidator}
				onRowClick={handleRowClick}
				contextMenuFields={contextMenu}
			/>
			<DialogContent style={{ minWidth: '94.375%', minHeight: '90%' }}>
				<div className="w-full h-full">
					<DataHandlerForm dataHandler={unitValidator} onSubmit={handleSubmit} />
				</div>
			</DialogContent>
		</Dialog>
		// <div className="container mx-auto py-10 h-full w-full flex flex-col">

		// </div>
	);
}
