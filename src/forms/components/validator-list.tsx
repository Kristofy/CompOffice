'use client';

import ValidatorForm from '@/forms/components/validator-form';
import { SubmitHandler } from 'react-hook-form';
import { set, z } from 'zod';
import { participantValiadator } from '@/forms/schemas/order';
import { participant } from '@prisma/client';
import { ValidatorTable } from '@/forms/components/validator-table';
import {
	ReactNode,
	SetStateAction,
	useCallback,
	useDeferredValue,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { CiEdit } from 'react-icons/ci';
import { FormExtras, Validator } from '../type-info';

import { schemaKeys } from '@/forms/type-info';
import ValidatorListHeader, { ValidatorListOrder } from './list-header';
import { getFilters, WithFilter } from './filter-item';

export function ValidatorList<T extends object>({ validator }: { validator: Validator<T> }) {
	const [selectedCommand, setSelectCommand] = useState<keyof T | null>(null);
	const [sortedColumn, setSortedColumn] = useState<ValidatorListOrder<T>>({
		prop: schemaKeys(validator.formSchema)[0]!,
		order: 'DESC',
	});
	const { data: apiResponse, status } = validator.get.useQuery();
	const sortedData = useRef<WithFilter<T>[]>([]);
	const filteredData = useRef<WithFilter<T>[]>([]);
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
	const defferedFilterValues = useDeferredValue(filterValues);
	const defferedFilterChanged = useDeferredValue(filterChanged);

	const Row = useMemo(
		() =>
			validator?.form?.row ??
			(({ data, index }: { data: T; index: number }) => {
				const dataFields = Object.fromEntries(
					Object.entries(data).map(([k, v]) => [
						k,
						<div key={k} className="ml-3 flex items-center justify-center h-full">
							<span className="text-ellipsis block max-w-full overflow-hidden text-nowrap">
								{v}
							</span>
						</div>,
					])
				) as Record<keyof T, React.ReactNode>;

				const extraFields = [<CiEdit key="validation-component-edit" />];

				return { ...dataFields, ...extraFields };
			}),
		[validator]
	);

	// When the api responds with data, create the data for the filters
	useEffect(() => {
		// console.log('Data loaded');
		sortedData.current = apiResponse?.map((p) => ({ data: p, filter: 0 })) ?? [];
		filteredData.current = sortedData.current;
		setTableData(sortedData.current.map((p) => p.data));
	}, [apiResponse]);

	// Keep the data sorted
	useEffect(() => {
		// console.log('Sort changed');
		filteredData.current = sortedData.current.sort((a: WithFilter<T>, b: WithFilter<T>) => {
			const prop = sortedColumn.prop;
			const lhs = a.data[prop];
			const rhs = b.data[prop];
			const order = sortedColumn.order === 'ASC' ? 1 : -1;
			const cmp = +(lhs > rhs) - +(lhs < rhs);
			return cmp * order;
		});

		setTableData(filteredData.current.filter((p) => p.filter === 0).map((p) => p.data));
	}, [sortedColumn]);

	useEffect(() => {
		// console.log('Filter changed');
		if (!defferedFilterChanged) {
			setTableData(filteredData.current.filter((p) => p.filter === 0).map((p) => p.data));
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
			applyFilter(
				defferedFilterChanged.filter,
				defferedFilterChanged.value,
				defferedFilterChanged.index,
				filteredData.current
			)
		);
	}, [defferedFilterChanged]);

	const extra = useMemo(() => {
		return [<p key="sdf">Hi</p>, <p key="ho">ASD</p>];
	}, []);

	console.log(extra);
	const header = useMemo(
		() => (
			<ValidatorListHeader
				validator={validator}
				setFilterValues={setFilterValues}
				sortBy={sortedColumn}
				setSortBy={setSortedColumn}
				filterValues={defferedFilterValues}
				setFilterChanged={setFilterChanged}
				extra={extra}
			/>
		),
		[defferedFilterValues, extra, sortedColumn, validator]
	);
	const optimizedHeader = useDeferredValue(header);

	const listComponent = useMemo(() => {
		console.log('Rerender list');

		return (
			<>
				<div className="container mx-auto p-2 h-full w-full flex flex-col">
					{status === 'loading' && 'Loading...'}
					{status === 'success' && !!tableData && (
						<ValidatorTable<T>
							validator={validator}
							data={tableData}
							row={Row}
							size={45}
							header={optimizedHeader}
						/>
					)}
				</div>
			</>
		);
	}, [status, tableData, validator, Row, optimizedHeader]);

	return listComponent;
}
