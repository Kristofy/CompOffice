'use client';

import { trpc } from '@/trpc/client/client';
import ValidatorForm from '@/forms/components/validator-form';
import { SubmitHandler } from 'react-hook-form';
import { unitValidator } from '@/forms/schemas/services';
import { z } from 'zod';
import { participantValiadator } from '@/forms/schemas/order';
import { unit } from '@prisma/client';
import ValidatorTable from '@/forms/components/validator-table';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

const Row = ({ data: unit, index }: { data: unit; index: number }) => {
	const entries = Object.entries(unit);
	const records = entries
		.map(([key, value]) => ({ [key]: value }))
		.reduce((acc, x) => ({ ...acc, ...x }), {});
	return records as Record<keyof unit, React.ReactNode>;
};

export default function DemoPage() {
	const { data: _units, status: unitStatus } = trpc.get.units.useQuery();
	const { mutate, error, data, status } = trpc.set.useMutation();

	const onSubmitHandler: SubmitHandler<any> = (data: z.infer<typeof unitValidator.formSchema>) => {
		mutate({
			id: data.id,
			code: data.code,
		});
	};

	const [units, setUnits] = useState<unit[] | null>(null);
	useEffect(() => {
		setUnits(_units ?? null);
	}, [_units]);

	const searchOn = (value: string) => {
		if (_units === undefined) return;

		if (value === '') {
			setUnits(_units);
			return;
		}

		const filtered = _units.filter((unit) => unit.code.includes(value));
		setUnits(filtered);
	};

	return (
		<div className="container mx-auto py-10 h-full w-full flex flex-col">
			<div className="block">
				<ValidatorForm validator={unitValidator} onSubmit={onSubmitHandler} />
				{status === 'idle' && 'Submit the form to update the unit code'}
				{status === 'loading' && 'Loading...'}
				{status === 'error' && 'Error!' + error.message}
				{status === 'success' && JSON.stringify(data)}
				<hr />
				<Input
					type="text"
					onInput={(e: React.ChangeEvent<HTMLInputElement>) => searchOn(e.target.value)}
				/>
				<hr />
			</div>
			{unitStatus === 'loading' && 'Loading...'}
			{unitStatus === 'error' && 'Error!' + error?.message}
			{unitStatus === 'success' && !!units && (
				<ValidatorTable<unit> validator={unitValidator} data={units} row={Row} size={45} />
			)}
		</div>
	);
}
