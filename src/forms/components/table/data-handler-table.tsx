'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import DataHandlerList, { ContextMenuField } from '@/forms/components/table/data-handler-list';
import { useDebounce } from '@/hooks/useDebounce';

import { DataHandler, FormProps, TableOrder } from '../../type-info';
import DataHandlerHeader from './data-handler-header';
import { WithFilter } from './filter-item';

interface DataHandlerTableProps<T extends object> {
	dataHandler: DataHandler<T>;
	onRowClick?: (data: T & Record<string, any>, index: number) => void;
	contextMenuFields?: ContextMenuField<T>[];
}

export default function DataHandlerTable<T extends object>({
	dataHandler,
	onRowClick,
	contextMenuFields = [],
}: DataHandlerTableProps<T>) {
	type AllKey = DataHandler<T>['columns']['all']['keys'][number];
	type AllType = T & Record<string, any>;
	const [sortedColumn, setSortedColumn] = useState<TableOrder<T>>({
		prop: dataHandler.columns.all.keys[0]!,
		order: 'DESC',
	});
	const { data: apiResponse, status } = dataHandler.server.useQuery();
	const sortedData = useRef<WithFilter<T>[]>([]);
	const filteredData = useRef<WithFilter<T>[]>([]);
	const [tableData, setTableData] = useState<T[]>([]);
	const [hiddenColumns, setHiddenColumns] = useState<Record<keyof T | string, boolean>>(
		Object.fromEntries<boolean>(
			Object.entries<FormProps<AllType, any, 'All'>>(dataHandler.columns.all.props).map(
				([key, props]) => [key, !!props.hidden]
			)
		) as Record<keyof T | string, boolean>
	);
	const [filterChanged, setFilterChanged] = useState<{
		filter: ({ target, data }: { target: any; data: T & Record<string, any> }) => boolean;
		value: any;
		index: number;
	} | null>(null);
	const [filterValues, setFilterValues] = useState<Record<AllKey, any>>(
		Object.fromEntries<any>(dataHandler.columns.all.keys.map((key) => [key, ''])) as Record<
			AllKey,
			any | null
		>
	);

	const defferedFilterValues = useDebounce(filterValues, 250);
	const defferedFilterChanged = useDebounce(filterChanged, 250);
	const defferedTableData = useDebounce(tableData, 600);

	const Row = useMemo(
		() =>
			({ data, index }: { data: AllType; index: number }) =>
				Object.fromEntries(
					Object.entries(data).map(([k, v]) => [
						k,
						<div key={k} className="ml-3 flex items-center justify-center h-full">
							<span className="text-ellipsis block max-w-full overflow-hidden text-nowrap">
								{v}
							</span>
						</div>,
					])
				) as Record<keyof T | string, React.ReactNode>,
		[]
	);

	// When the api responds with data, create the data for the filters
	const fieldCalculators = useMemo(() => {
		const calculatorEntries = Object.entries<FormProps<T, any, 'Additional'>>(
			dataHandler.columns.additional.props
		).map(([key, props]) => {
			return { key: key, calc: props.calc };
		});

		return (data: T) =>
			Object.fromEntries(
				calculatorEntries.map(({ key, calc }) => [key, calc ? calc({ data }) : ''])
			);
	}, [dataHandler]);

	useEffect(() => {
		// console.log('Data loaded');
		sortedData.current =
			apiResponse?.map((p) => {
				return { data: { ...p, ...fieldCalculators(p) }, filter: 0 } as WithFilter<T>;
			}) ?? [];
		filteredData.current = sortedData.current;
		setTableData(sortedData.current.map((p) => p.data));
	}, [apiResponse, fieldCalculators]);

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
		console.log('Filter changed');
		if (!defferedFilterChanged) {
			setTableData(filteredData.current.filter((p) => p.filter === 0).map((p) => p.data));
			return;
		}

		const applyFilter = (
			filter: ({ target, data }: { target: any; data: AllType }) => boolean,
			value: any,
			index: number,
			list: WithFilter<T>[]
		) => {
			const addIndex = 1 << index;
			const delIndex = ~addIndex;

			list.forEach((p) => {
				if (!filter({ target: value, data: p.data })) {
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

	const header = useMemo(
		() => (
			<DataHandlerHeader
				dataHandler={dataHandler}
				setFilterValues={setFilterValues}
				sortBy={sortedColumn}
				setSortBy={setSortedColumn}
				filterValues={defferedFilterValues}
				setFilterChanged={setFilterChanged}
				hiddenColumns={hiddenColumns}
				setHiddenColumns={setHiddenColumns}
			/>
		),
		[dataHandler, sortedColumn, defferedFilterValues, hiddenColumns]
	);

	const listComponent = useMemo(() => {
		console.log('Rerender list');

		return (
			<>
				<div className="container mx-auto m-3 h-full w-full flex flex-col">
					{header}
					{status === 'loading' && 'Loading...'}
					{status === 'success' && (
						<DataHandlerList<T>
							dataHandler={dataHandler}
							data={defferedTableData}
							row={Row}
							size={45}
							hiddenColumns={hiddenColumns}
							onRowClick={onRowClick}
							contextMenuFields={contextMenuFields}
						/>
					)}
				</div>
			</>
		);
	}, [
		header,
		status,
		dataHandler,
		defferedTableData,
		Row,
		hiddenColumns,
		onRowClick,
		contextMenuFields,
	]);

	return listComponent;
}
