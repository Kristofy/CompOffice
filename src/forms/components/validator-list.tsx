'use client';

import ValidatorForm from '@/forms/components/validator-form';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { participantValiadator } from '@/forms/schemas/order';
import { participant } from '@prisma/client';
import { ValidatorTable } from '@/forms/components/validator-table';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormExtras, Validator } from '../type-info';

export function ValidatorList<T>({ validator }: { validator: Validator<T> }) {
	const Row =
		validator?.form?.row ??
		(({ data, index }: { data: T; index: number }) => {
			return data as Record<keyof T, React.ReactNode>;
		});

	const { data: originalData, status } = validator.get.useQuery();

	const onSubmitHandler: SubmitHandler<any> = (
		data: z.infer<typeof participantValiadator.formSchema>
	) => {
		console.log(data);
	};

	interface WithFilter {
		data: T;
		filter: number;
	}

	const [filterData, setFilterData] = useState<WithFilter[]>(
		originalData?.map((p) => ({ data: p, filter: 0 })) ?? []
	);

	useEffect(() => {
		setFilterData(originalData?.map((p) => ({ data: p, filter: 0 })) ?? []);
	}, [originalData]);

	const [filtered, setFiltered] = useState<T[]>(
		filterData.filter((p) => p.filter === 0).map((p) => p.data)
	);

	useEffect(() => {
		setFiltered(filterData.filter((p) => p.filter === 0).map((p) => p.data));
	}, [filterData]);

	// const [order, setOrder] = useState<'asc' | 'desc'>('asc');

	// const sortOn = () => {
	// 	// sorts inplace
	// 	filterData.sort(
	// 		(a, b) => a.data.name.localeCompare(b.data.name) * (order === 'asc' ? 1 : -1)
	// 	);

	// 	setOrder(order === 'asc' ? 'desc' : 'asc');
	// 	setFiltered(filterData.filter((p) => p.filter === 0).map((p) => p.data));
	// };

	const applyFilter = (filter: (target: any, _: T) => boolean, target: any, index: number) => {
		// assert that index is between 0 and 31
		if (index < 0 || index > 31) {
			throw new Error('Index out of bounds');
		}

		const addIndex = 1 << index;
		const delIndex = ~addIndex;

		filterData.forEach((p) => {
			if (!filter(target, p.data)) {
				p.filter |= addIndex;
			} else {
				p.filter &= delIndex;
			}
		});

		setFiltered(filterData.filter((p) => p.filter === 0).map((p) => p.data));
	};

	const filters = Object.entries(validator.extras)
		.map(([key, value], index) => {
			const extras = value as FormExtras<T>;
			const filter = extras.filter;
			if (!filter) {
				return null;
			}

			return (
				<div key={key} className="flex flex-col">
					<label>{key}</label>
					<Input
						type={extras.type}
						placeholder={key}
						onChange={(e) => {
							applyFilter(filter, e.target.value, index);
						}}
					/>
				</div>
			);
		})
		.filter((f) => f !== null);

	return (
		<div className="container mx-auto py-10 h-full w-full flex flex-col">
			<div className="flex flex-col gap-2">{filters}</div>
			{status === 'loading' && 'Loading...'}
			{status === 'success' && !!filtered && (
				<ValidatorTable<T> validator={validator} data={filtered} row={Row} size={45} />
			)}
		</div>
	);
}
