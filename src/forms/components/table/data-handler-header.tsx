'use client';

import { Dispatch, ReactNode, SetStateAction, useMemo } from 'react';

import HeaderItem from '@/forms/components/table/header-item';
import { DataHandler, FormProps, TableOrder } from '@/forms/type-info';

export default function DataHandlerHeader<T extends object>({
	dataHandler,
	setFilterChanged,
	sortBy,
	setSortBy,
	filterValues,
	setFilterValues,
	hiddenColumns,
	setHiddenColumns,
}: {
	dataHandler: DataHandler<T>;
	setFilterChanged: (
		value: SetStateAction<{
			filter: ({ target, data }: { target: any; data: T & Record<string, any> }) => boolean;
			value: any;
			index: number;
		} | null>
	) => void;
	sortBy: { prop: keyof T | string; order: 'ASC' | 'DESC' };
	setSortBy: (sortBy: TableOrder<T>) => void;
	filterValues: Record<keyof T | string, any>;
	setFilterValues: Dispatch<SetStateAction<Record<string | keyof T, any>>>;
	hiddenColumns: Record<keyof T | string, boolean>;
	setHiddenColumns: Dispatch<SetStateAction<Record<string | keyof T, boolean>>>;
}) {
	const setDefaultHeader = useMemo((): ReactNode => {
		return (
			<div className="border-2 bg-background rounded-t-3xl overflow-hidden block">
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: dataHandler.form.getGridLayout(hiddenColumns),
					}}>
					{Object.entries<FormProps<T & Record<string, any>, any, 'All'>>(
						dataHandler.columns.all.props
					).map(([key, props], index) => {
						if (hiddenColumns[key] === true) {
							return null;
						}

						return (
							<HeaderItem<T>
								key={key}
								dataHandler={dataHandler}
								props={props}
								filterValues={filterValues}
								hiddenColumns={hiddenColumns}
								name={key as string}
								setHiddenColumns={setHiddenColumns}
								setFilterChanged={setFilterChanged}
								setFilterValues={setFilterValues}
								setSortBy={setSortBy}
								sortBy={sortBy}
								index={index}
							/>
						);
					})}
				</div>
			</div>
		);
	}, [
		dataHandler,
		hiddenColumns,
		filterValues,
		setHiddenColumns,
		setFilterChanged,
		setFilterValues,
		setSortBy,
		sortBy,
	]);

	return setDefaultHeader;
}
