'use client';

import ValidatorForm from '@/forms/components/validator-form';
import { SubmitHandler } from 'react-hook-form';
import { set, z } from 'zod';
import { participantValiadator } from '@/forms/schemas/order';
import { participant } from '@prisma/client';
import { ValidatorTable } from '@/forms/components/validator-table';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { FormExtras, Validator } from '../type-info';

import { schemaKeys } from '@/forms/type-info';
import ValidatorListHeader, { ValidatorListOrder } from './list-header';
import { getFilters, WithFilter } from './filter-item';

export function ValidatorList<T>({ validator }: { validator: Validator<T> }) {
	const [selectedCommand, setSelectCommand] = useState<keyof T | null>(null);
	const [sortedColumn, setSortedColumn] = useState<ValidatorListOrder<T>>({
		prop: schemaKeys(validator.formSchema)[0]!,
		order: 'DESC',
	});

	const { data: apiResponse, status } = validator.get.useQuery();
	const [sortedData, setSortedData] = useState<{ data: WithFilter<T>[] }>({ data: [] });
	const [filteredData, setFilteredData] = useState<{ data: WithFilter<T>[] }>({ data: [] });
	const [tableData, setTableData] = useState<T[]>([]);
	const [filterChanged, setFilterChanged] = useState<{
		filter: (target: any, data: T) => boolean;
		value: string;
		index: number;
	} | null>(null);

	const [filterValues, setFilterValues] = useState<Record<keyof T, any>>({
		...(Object.fromEntries<any>(schemaKeys(validator.formSchema).map((key) => [key, ''])) as Record<
			keyof T,
			any | null
		>),
	});

	const Row =
		validator?.form?.row ??
		(({ data, index }: { data: T; index: number }) => {
			return data as Record<keyof T, React.ReactNode>;
		});

	const onSubmitHandler: SubmitHandler<any> = (
		data: z.infer<typeof participantValiadator.formSchema>
	) => {
		console.log(data);
	};

	// When the api responds with data, create the data for the filters
	useEffect(() => {
		setSortedData({ data: apiResponse?.map((p) => ({ data: p, filter: 0 })) ?? [] });
	}, [apiResponse]);

	// Keep the data sorted
	useEffect(() => {
		console.log('sorting');
		setFilteredData({
			data: sortedData.data.sort((a: WithFilter<T>, b: WithFilter<T>) => {
				const prop = sortedColumn.prop;
				const lhs = a.data[prop];
				const rhs = b.data[prop];
				const order = sortedColumn.order === 'ASC' ? 1 : -1;
				const cmp = +(lhs > rhs) - +(lhs < rhs);
				return cmp * order;
			}),
		});
	}, [sortedData, sortedColumn]);

	useEffect(() => {
		if (!filterChanged) {
			setTableData(filteredData.data.filter((p) => p.filter === 0).map((p) => p.data));
			return;
		}

		const applyFilter = (
			filter: (target: any, data: T) => boolean,
			value: string,
			index: number,
			list: WithFilter<T>[]
		) => {
			const addIndex = 1 << index;
			const delIndex = ~addIndex;

			list.forEach((p) => {
				if (!filter(value, p.data)) {
					p.filter |= addIndex;
				} else {
					p.filter &= delIndex;
				}
			});

			return list.filter((p) => p.filter === 0).map((p) => p.data);
		};
		setTableData(
			applyFilter(filterChanged.filter, filterChanged.value, filterChanged.index, filteredData.data)
		);
	}, [filterChanged, filteredData]);

	const callback = useCallback(
		(filter: (target: any, data: T) => boolean, value: string, index: number) => {
			setFilterChanged({ filter, value, index });
		},
		[]
	);

	const filterElements = useMemo<Record<keyof T, JSX.Element | null>>(() => {
		// NOTE(Kristofy): This rerenders on every input because of the default value of the previous state
		return getFilters(validator, callback, setFilterValues, filterValues);
	}, [validator, callback, filterValues]);

	return (
		<>
			<div className="container mx-auto p-2 h-full w-full flex flex-col">
				<ValidatorListHeader
					filterElements={filterElements}
					sortBy={sortedColumn}
					setSortBy={setSortedColumn}
					filterValues={filterValues}
				/>
				{status === 'loading' && 'Loading...'}
				{status === 'success' && !!tableData && (
					<ValidatorTable<T> validator={validator} data={tableData} row={Row} size={45} />
				)}
			</div>
		</>
	);
}
