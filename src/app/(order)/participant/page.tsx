'use client';

import { trpc } from '@/trpc/client/client';
import ValidatorForm from '@/forms/components/validator-form';
import { SubmitHandler } from 'react-hook-form';
import { set, z } from 'zod';
import { participantValiadator } from '@/forms/schemas/order';
import { participant } from '@prisma/client';
import ValidatorTable from '@/forms/components/validator-table';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Row = ({ data: participant, index }: { data: participant; index: number }) => {
	const entries = Object.entries(participant);
	const records = entries
		.map(([key, value]) => ({ [key]: value }))
		.reduce((acc, x) => ({ ...acc, ...x }), {});
	return records as Record<keyof participant, React.ReactNode>;
};

export default function DemoPage() {
	const { data: _participants, status } = trpc.get.participants.useQuery();

	const onSubmitHandler: SubmitHandler<any> = (
		data: z.infer<typeof participantValiadator.formSchema>
	) => {
		console.log(data);
	};

	interface WithFilter {
		data: participant;
		filter: number;
	}

	const [participants, setParticipants] = useState<WithFilter[]>(
		_participants?.map((p) => ({ data: p, filter: 0 })) ?? []
	);

	useEffect(() => {
		setParticipants(_participants?.map((p) => ({ data: p, filter: 0 })) ?? []);
	}, [_participants]);

	const [filtered, setFiltered] = useState<participant[]>(
		participants.filter((p) => p.filter === 0).map((p) => p.data)
	);

	useEffect(() => {
		setFiltered(participants.filter((p) => p.filter === 0).map((p) => p.data));
	}, [participants]);

	const [order, setOrder] = useState<'asc' | 'desc'>('asc');

	const sortOn = () => {
		// sorts inplace
		participants.sort(
			(a, b) => a.data.name.localeCompare(b.data.name) * (order === 'asc' ? 1 : -1)
		);

		setOrder(order === 'asc' ? 'desc' : 'asc');
		setFiltered(participants.filter((p) => p.filter === 0).map((p) => p.data));
	};

	const searchOn = (value: string) => {
		console.log(`Search changed "${value}"`);
		const filterIndex = 0;

		const addIndex = 1 << filterIndex;
		const delIndex = ~addIndex;

		if (value === '') {
			participants.forEach((p) => (p.filter &= delIndex));
		} else {
			participants.forEach((p) => {
				if (!p.data.name.includes(value)) {
					p.filter |= addIndex;
				} else {
					p.filter &= delIndex;
				}
			});
		}

		setFiltered(participants.filter((p) => p.filter === 0).map((p) => p.data));
	};

	return (
		<div className="container mx-auto py-10 h-full w-full flex flex-col">
			<div className="block">
				<ValidatorForm validator={participantValiadator} onSubmit={onSubmitHandler} />
				<hr />
				<Button onClick={() => sortOn()}>Click me</Button>
				<Input
					type="text"
					onInput={(e: React.ChangeEvent<HTMLInputElement>) => searchOn(e.target.value)}
				/>
				<hr />
			</div>
			{status === 'loading' && 'Loading...'}
			{status === 'success' && !!filtered && (
				<ValidatorTable<participant>
					validator={participantValiadator}
					data={filtered}
					row={Row}
					size={45}
				/>
			)}
		</div>
	);
}
