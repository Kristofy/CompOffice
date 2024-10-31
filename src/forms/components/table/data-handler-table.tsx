'use client';

import { useEffect, useMemo, useRef, useState, useOptimistic, useTransition } from 'react';

import DataHandlerList, { ContextMenuField } from '@/forms/components/table/data-handler-list';
import { useDebounce } from '@/hooks/useDebounce';

import { DataHandler, FormProps, TableOrder } from '../../type-info';
import DataHandlerHeader from './data-handler-header';
import { WithFilter } from './filter-item';
import { string } from 'zod';
import toast from 'react-hot-toast';
import { serverGet, trpc } from '@/trpc/client/client';

export type OptimisticAction<T> = {
	type: 'update' | 'create' | 'delete';
	payload: T & Record<string, any>;
};

interface DataHandlerTableProps<T extends object> {
	dataHandler: DataHandler<T>;
	onRowClick?: (data: T & Record<string, any>, index: number) => void;
	contextMenuFields?: ContextMenuField<T>[];
	optimisticUpdate?: OptimisticAction<T>,
	handleSubmit?: (data: T & Record<string, any>) => Promise<boolean>;
	setList?: (list: (T & Record<string, any>)[]) => void;
}

/**
 * Renders a data handler table component with filtering, sorting, and display functionalities.
 *
 * @param {DataHandlerTableProps<T>} dataHandler - The data handler configuration for the table.
 * @param {Function} onRowClick - The function to execute when a row is clicked.
 * @param {ContextMenuField[]} contextMenuFields - The list of context menu fields.
 * @param {boolean} optimisticUpdate - Flag indicating if optimistic updates are enabled.
 * @param {Function} handleSubmit - The function to handle form submission.
 * @param {Function} setList - The function to set the list data.
 * @return {JSX.Element} The rendered data handler table component.
 */
export default function DataHandlerTable<T extends object>({
	dataHandler,
	onRowClick,
	contextMenuFields = [],
	optimisticUpdate,
	handleSubmit,
	setList,
}: DataHandlerTableProps<T>) {
	type AllKey = DataHandler<T>['columns']['all']['keys'][number];
	type AllType = T & Record<string, any>;
	const [sortedColumn, setSortedColumn] = useState<TableOrder<T>>({
		prop: dataHandler.columns.all.keys[0]!,
		order: 'DESC',
	});

	const useQuery = serverGet(dataHandler);
	const { data: apiResponse, status } = useQuery();

	const sortedData = useRef<WithFilter<T>[]>([]);

	const filteredData = useRef<WithFilter<T>[]>([]);
	const [tableData, setTableData] = useState<(T & Record<string, any>)[]>([]);
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


	const [displayedTableData, setDisplayedTableData] = useState<(T & Record<string, any>)[]>([]);
	useEffect(() => {
		setDisplayedTableData(defferedTableData);
		setList?.(defferedTableData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defferedTableData]);

	useEffect(() => {
		console.log('Optimistic update', optimisticUpdate);
		if (!optimisticUpdate) {
			return;
		}

		const update = async () => {
			const reducer = (state: (T & Record<string, any>)[], action: OptimisticAction<T>) => {
				switch (action.type) {
					case 'update':
						return state.map((p) => {
							if (p.id === action.payload.id) {
								return action.payload;
							}
							return p;
						});
					case 'create':
						return [action.payload, ...state];
					case 'delete':
						return state.filter((p) => p.id !== action.payload.id);
					default:
						return state;
				}
			}


			const serverProps = Object
				.entries(dataHandler.columns.server.props)
				.map(([key, props]) => [key, props.calc({ data: optimisticUpdate.payload })]);

			const clientProps = Object
				.entries(dataHandler.columns.additional.props)
				.map(([key, props]) => [key, props.calc({ data: optimisticUpdate.payload })]);

			const payload = {
				...optimisticUpdate.payload,
				...Object.fromEntries(serverProps),
				...Object.fromEntries(clientProps),
			};

			const oldState = defferedTableData;

			try {
				const newState = reducer(defferedTableData, { type: optimisticUpdate.type, payload });
				setDisplayedTableData(newState);

				const shouldUpdate = await handleSubmit?.(payload);

				if (!shouldUpdate) {
					setDisplayedTableData(oldState);
				}
			} catch (err) {
				setDisplayedTableData(oldState);
				toast.error('Unexpected error');
			}


		};

		update();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataHandler, optimisticUpdate]);


	// When this is called from outside then update the table data


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
		console.log('Data loaded');
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
		// console.log('Filter changed');
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
		// console.log('Rerender list');

		return (
			<>
				<div className="container mx-auto m-3 h-full w-full flex flex-col">
					{header}
					{status === 'loading' && 'Loading...'}
					{status === 'success' && (
						<DataHandlerList<T>
							dataHandler={dataHandler}
							data={displayedTableData}
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
		displayedTableData,
		Row,
		hiddenColumns,
		onRowClick,
		contextMenuFields,
	]);

	return listComponent;
}
