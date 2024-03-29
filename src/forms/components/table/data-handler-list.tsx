import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import AutoResizer from 'react-virtualized-auto-sizer';

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';

import { DataHandler } from '../../type-info';
import VirtualTable from './virtual-table';

type RowFunction<T> = ({
	data,
	index,
}: {
	data: T & Record<string, any>;
	index: number;
}) => Record<keyof T | string, React.ReactNode>;

export type ContextMenuField<T> = {
	name: string;
	onClick: (data: T & Record<string, any>, key: keyof T | string) => void;
};

interface DataHandlerListProps<T extends object> {
	row: RowFunction<T>;
	data: (T & Record<string, any>)[];
	dataHandler: DataHandler<T>;
	size: number;
	header?: React.ReactNode;
	hiddenColumns: Record<keyof T | string, boolean>;
	onRowClick?: (data: T & Record<string, any>, index: number) => void;
	contextMenuFields?: ContextMenuField<T>[];
}

type DataHandlerRowContextMenuProps<T extends object> = {
	fields?: ContextMenuField<T>[];
	data: T & Record<string, any>;
	property: keyof T | string;
};

function DataHandlerRowContextMenu<T extends object>({
	fields,
	data,
	property,
}: DataHandlerRowContextMenuProps<T>) {
	return (
		<ContextMenuContent>
			{fields?.map(({ name, onClick }) => (
				<ContextMenuItem key={name} inset onSelect={() => onClick(data, property)}>
					{name}
				</ContextMenuItem>
			))}
		</ContextMenuContent>
	);
}

export default function DataHandlerList<T extends object>({
	row,
	data,
	dataHandler,
	size,
	hiddenColumns,
	onRowClick,
	contextMenuFields,
}: DataHandlerListProps<T>) {
	const calculateRow = useCallback(
		(
			currentElement: Record<string | keyof T, React.ReactNode>,
			currentValue: T & Record<string, any>,
			index: number
		) => {
			return (
				<tr className={`hover:bg-accent ${index % 2 ? 'bg-secondary' : 'bg-secondary/75'}`}>
					{Object.entries<React.ReactNode>(currentElement)
						.filter(([key, _]) => !hiddenColumns[key])
						.map(([key, value]) => (
							<td
								key={key as string}
								className="m-0 p-0"
								style={{ height: size, overflow: 'hidden' }}>
								<ContextMenu>
									<ContextMenuTrigger
										style={{ display: 'block', height: size, overflow: 'hidden' }}
										onSelect={() => {
											onRowClick?.({ ...currentValue }, index);
										}}>
										{value}
									</ContextMenuTrigger>
									<DataHandlerRowContextMenu
										property={key}
										data={currentValue}
										fields={contextMenuFields}
									/>
								</ContextMenu>
							</td>
						))}
				</tr>
			);
		},
		[contextMenuFields, hiddenColumns, onRowClick, size]
	);

	/**
	 * Row Calculation: There are 3 states
	 * 1. While actively typing then the row is calculated on the fly
	 * 2. When the user stops typing then the row is precomputed after some set time
	 * 3. When there is no change for a while then the whole list is precomputed
	 */

	const preComputedRowProps = useRef<Record<keyof T | string, React.ReactNode>[] | null>(null);

	const preComputedRows = useRef<React.ReactNode[] | null>(null);

	useEffect(() => {
		preComputedRowProps.current = null;
		preComputedRows.current = null;

		// after a few seconds precompute the list item props
		let inner_timeout: NodeJS.Timeout | null = null;
		const timeout = setTimeout(() => {
			preComputedRowProps.current = data.map((current, index) => {
				return row({ data: current, index });
			});
			console.log('precomputed row props');

			// after an additional few seconds precompute the whole list
			inner_timeout = setTimeout(() => {
				preComputedRows.current = data.map((current, index) => {
					return calculateRow(
						preComputedRowProps.current?.[index] ?? row({ data: current, index }),
						current,
						index
					);
				});
				console.log('precomputed rows');
			}, 1000);
		}, 1000);

		return () => {
			clearTimeout(timeout);
			if (inner_timeout) {
				clearTimeout(inner_timeout);
			}
		};
	}, [calculateRow, data, row]);

	const Row = ({ index, style }: { index: number; style: any }) => {
		if (preComputedRows.current) {
			return preComputedRows.current[index];
		}

		if (preComputedRowProps.current) {
			const currentElement = preComputedRowProps.current[index];
			return calculateRow(currentElement, data[index], index);
		}

		return calculateRow(row({ data: data[index], index }), data[index], index);
	};

	const columnLayout = useMemo(() => {
		console.log('recalculated layout');
		return dataHandler.form.getColumnLayout(hiddenColumns);
	}, [dataHandler, hiddenColumns]);

	/**
	 * overscanCount: While actively typeing then the overscan count is 1
	 * When the user stops typing then the overscan count is 7
	 */
	const [overscan, setOverscan] = useState(1);
	useEffect(() => {
		console.log('Set overscan to 1');
		setOverscan(1);
		const timeout = setTimeout(() => {
			console.log('Set overscan to 7');
			setOverscan(7);
		}, 800);

		return () => clearTimeout(timeout);
	}, [data]);

	return (
		<div className="block w-full h-full m-0">
			<AutoResizer>
				{({ height, width }) => (
					<VirtualTable
						height={height}
						width={width}
						itemCount={data.length}
						itemSize={size}
						overscanCount={overscan}
						columnLayout={<colgroup>{columnLayout}</colgroup>}
						row={Row}
					/>
				)}
			</AutoResizer>
		</div>
	);
}
