import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';

import { DataHandler, FormProps, TableOrder } from '../../type-info';
import FilterItem from './filter-item';

interface HeaderItemProps<T extends object> {
	dataHandler: DataHandler<T>;
	props: FormProps<T & Record<string, any>, any, 'All'>;
	filterValues: Record<keyof T | string, any>;
	sortBy: TableOrder<T>;
	setSortBy: (sortBy: TableOrder<T>) => void;
	name: string;
	hiddenColumns: Record<keyof T | string, boolean>;
	setHiddenColumns: Dispatch<SetStateAction<Record<string | keyof T, boolean>>>;
	setFilterValues: Dispatch<SetStateAction<Record<string | keyof T, any>>>;
	setFilterChanged: (
		value: SetStateAction<{
			filter: ({ target, data }: { target: any; data: T & Record<string, any> }) => boolean;
			value: any;
			index: number;
		} | null>
	) => void;
	index: number;
}

export default function HeaderItem<T extends object>({
	dataHandler,
	props,
	filterValues,
	sortBy,
	setSortBy,
	name,
	hiddenColumns,
	setHiddenColumns,
	setFilterValues,
	setFilterChanged,
	index,
}: HeaderItemProps<T>) {
	const [popoverOpen, setPopoverOpen] = useState(false);

	const filterValue = filterValues[name];
	const changeHandler = useCallback(
		(value: any, key: keyof T | string) => {
			setFilterValues({ ...filterValues, [key]: value });
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filterValue, setFilterValues]
	);

	const filterElement = useMemo(() => {
		console.log('filter element rebuilt');

		return (
			<FilterItem
				dataHandler={dataHandler}
				index={index}
				name={name}
				props={props}
				onDone={() => setPopoverOpen(false)}
				setFilterChanged={setFilterChanged}
				onChange={changeHandler}
				value={filterValue}
			/>
		);
	}, [changeHandler, dataHandler, filterValue, index, name, props, setFilterChanged]);

	const contextMenuContent = useMemo(() => {
		console.log('context menu rebuilt');

		return (
			<ContextMenuContent>
				<ContextMenuSeparator />
				<ContextMenuCheckboxItem
					checked
					onSelect={() =>
						setHiddenColumns({
							...hiddenColumns,
							[name]: !hiddenColumns[name],
						})
					}>
					{name as string}
					<ContextMenuShortcut>⌘h</ContextMenuShortcut>
				</ContextMenuCheckboxItem>
				<ContextMenuSeparator />

				{dataHandler.columns.all.keys.map((k) => (
					<ContextMenuCheckboxItem
						key={k as string}
						{...(!!hiddenColumns[k as keyof T | string] ? {} : { checked: true })}
						onSelect={() =>
							setHiddenColumns({
								...hiddenColumns,
								[k]: !hiddenColumns[k],
							})
						}>
						{k as string}
					</ContextMenuCheckboxItem>
				))}
			</ContextMenuContent>
		);
	}, [dataHandler, hiddenColumns, name, setHiddenColumns]);

	const popoverContent = useMemo(() => {
		console.log('popover content rebuilt');
		return (
			<PopoverContent align="center" className="rounded-xl border p-0">
				<h4 className="capitalize font-semibold text-sm py-1 m-2">Order</h4>
				<hr />
				<PopoverClose asChild>
					<div
						className="w-full py-2 hover:bg-accent cursor-pointer"
						onClick={(e) => {
							document.body.click();
							setSortBy({ prop: name as keyof T, order: 'ASC' });
						}}>
						<div className="w-full text-left px-3 flex flex-row items-center ">
							<FaSortAmountUp /> &nbsp; Increasing
						</div>
					</div>
				</PopoverClose>
				<PopoverClose asChild>
					<div
						className="w-full py-2 hover:bg-accent cursor-pointer"
						onClick={() => setSortBy({ prop: name as keyof T, order: 'DESC' })}>
						<div className="w-full text-left px-3 flex flex-row items-center ">
							<FaSortAmountDown /> &nbsp; Decreasing
						</div>
					</div>
				</PopoverClose>
				<hr />
				<h4 className="capitalize font-semibold text-sm pt-3 pb-1 mx-2">Filter</h4>
				<hr />
				<div className="w-full text-left p-3">
					{!!filterElement ? filterElement : 'Missing filter'}
				</div>
			</PopoverContent>
		);
	}, [filterElement, name, setSortBy]);

	console.log('header item rebuilt');
	return (
		<div className="w-full">
			<ContextMenu>
				<ContextMenuTrigger>
					<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
						<PopoverTrigger asChild className="w-full h-full">
							<div>
								<Button
									variant="default"
									className="px-1 py-2 hover:bg-accent font-bold text-lg rounded-none w-full h-full focus-visible:ring-0"
									onSelect={() => setPopoverOpen(true)}>
									<div className="block w-full">
										{!!props.header ? (
											props.header<T>({
												filterValues,
												dataHandler,
											})
										) : (
											<>
												<div className="inline-block w-full self-center truncate">
													<small className="text-md font-light">
														{filterValues[name as keyof T]}
													</small>
												</div>
												<div className="w-full h-full flex flex-row items-center justify-center overflow-hidden text-nowrap">
													{sortBy.prop === (name as keyof T) && (
														<>
															{sortBy.order === 'ASC' ? <FaSortAmountUp /> : <FaSortAmountDown />}
															&nbsp; &nbsp;
														</>
													)}
													<span>{name}</span> &nbsp;&nbsp;
													<span className="sr-only">Open menu</span>
												</div>
											</>
										)}
									</div>
								</Button>
							</div>
						</PopoverTrigger>
						{popoverContent}
					</Popover>
				</ContextMenuTrigger>
				{contextMenuContent}
			</ContextMenu>
		</div>
	);
}
