'use client';

import { useMemo } from 'react';

import toast from 'react-hot-toast';

import { ContextMenuField } from '@/forms/components/table/data-handler-list';
import DataHandlerTable from '@/forms/components/table/data-handler-table';
import { participantValiadator } from '@/forms/schemas/order';
import { participant } from '@prisma/client';

export default function ParticipantPage() {
	const contextMenu: ContextMenuField<participant>[] = useMemo(
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
		<>
			<DataHandlerTable dataHandler={participantValiadator} contextMenuFields={contextMenu} />;
		</>
	);
}
