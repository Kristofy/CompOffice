import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import AutoResizer from 'react-virtualized-auto-sizer';

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
} from '@/components/ui/context-menu';
import { ContextMenuTrigger } from '@radix-ui/react-context-menu';

import { DataHandler, FormProps } from '../../type-info';
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

export default function DataHandlerList<T extends object>({
	row,
	data,
	dataHandler,
	size,
	hiddenColumns,
	onRowClick,
	contextMenuFields,
}: DataHandlerListProps<T>) {
	const [optimizationLevel, setOptimizationLevel] = useState<'None' | 'Pre1' | 'Pre2'>('None');

	const calculateRow = useCallback(
		(
			currentElement: Record<string | keyof T, React.ReactNode>,
			currentValue: T & Record<string, any>,
			index: number
		) => {
			if (!currentElement) {
				return null;
			}

			return (
				<tr className={`hover:bg-accent ${index % 2 ? 'bg-secondary' : 'bg-secondary/75'}`}>
					{Object.entries<React.ReactNode>(currentElement)
						.filter(([key, _]) => !hiddenColumns[key])
						.map(([key, value]) => (
							<td
								key={key as string}
								className="m-0 p-0"
								style={{ height: size, overflow: 'hidden' }}>
								<div style={{ display: 'block', height: size, overflow: 'hidden' }}>{value}</div>
							</td>
						))}
				</tr>
			);
		},
		[hiddenColumns, size]
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
		setOptimizationLevel('None');
		preComputedRowProps.current = null;
		preComputedRows.current = null;

		// after a few seconds precompute the list item props
		let inner_timeout: NodeJS.Timeout | null = null;
		const timeout = setTimeout(() => {
			preComputedRowProps.current = data.map((current, index) => {
				return row({ data: current, index });
			});
			setOptimizationLevel('Pre1');

			// after an additional few seconds precompute the whole list
			inner_timeout = setTimeout(() => {
				preComputedRows.current = data.map((current, index) => {
					return calculateRow(
						preComputedRowProps.current?.[index] ?? row({ data: current, index }),
						current,
						index
					);
				});
				setOptimizationLevel('Pre2');
			}, 1000);
		}, 1000);

		return () => {
			clearTimeout(timeout);
			if (inner_timeout) {
				clearTimeout(inner_timeout);
			}
		};
	}, [calculateRow, data, row]);

	// TOOD(Krisotfy): Why is this not a state?
	const Row = ({ index }: { index: number }) => {
		if (optimizationLevel === 'Pre2' && preComputedRows.current) {
			return preComputedRows.current[index];
		}

		if (optimizationLevel === 'Pre1' && preComputedRowProps.current) {
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
		setOverscan(1);
		const timeout = setTimeout(() => {
			setOverscan(21);
		}, 2500);

		return () => clearTimeout(timeout);
	}, [data]);

	const [contextMenuContent, setContextMenuContent] = useState<React.ReactNode | null>(null);

	const handleContext = useCallback(
		(index: number, colIndex: number) => {
			// set key to the colIndex th key of the datas wisible keys
			const visibleKeys = Object.entries<FormProps<T & Record<string, any>, any, 'All'>>(
				dataHandler.columns.all.props
			)
				.filter(([k, v]) => !hiddenColumns[k])
				.map(([k, v]) => k);

			if (colIndex < 0 || colIndex >= visibleKeys.length) {
				setContextMenuContent(null);
				return;
			}

			const key = visibleKeys[colIndex];

			setContextMenuContent(
				<ContextMenuContent>
					<ContextMenuLabel>{key}</ContextMenuLabel>
					{contextMenuFields?.map(({ name, onClick }) => (
						<ContextMenuItem key={name} inset onSelect={() => onClick(data[index], key)}>
							{name}
						</ContextMenuItem>
					))}
				</ContextMenuContent>
			);
		},
		[contextMenuFields, data, dataHandler, hiddenColumns]
	);

	const handleRowClick = useCallback(
		(index: number) => {
			onRowClick?.(data[index], index);
		},
		[data, onRowClick]
	);

	return (
		<>
			<div className="block w-full h-full m-0">
				<AutoResizer>
					{({ height, width }) => (
						<ContextMenu>
							<ContextMenuTrigger>
								<VirtualTable
									height={height - 60}
									width={width}
									itemCount={data.length}
									itemSize={size}
									overscanCount={overscan}
									onContextMenu={handleContext}
									onRowClick={handleRowClick}
									columnLayout={<colgroup>{columnLayout}</colgroup>}
									row={Row}
								/>
							</ContextMenuTrigger>
							{contextMenuContent}
						</ContextMenu>
					)}
				</AutoResizer>
			</div>
		</>
	);
}
