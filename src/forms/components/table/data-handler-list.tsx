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

/**
 * Renders a DataHandlerList component that displays a list of data rows with dynamic row calculation based on user interaction.
 *
 * The component is designed to be used with a DataHandler that is capable of providing the component with the necessary data to be displayed
 * in the list.
 *
 * The component takes the following props:
 *  @param {RowFunction<T>} row - Function to calculate the individual rows in the list
 *  @param {(T & Record<string, any>)[]} data - Array of data rows to be displayed
 *  @param {DataHandler<T>} dataHandler - Data handler for manipulating the data
 *  @param {number} size - Height of each row in pixels
 *  @param {Record<keyof T | string, boolean>} hiddenColumns - Object containing keys of hidden columns
 *  @param {(data: T & Record<string, any>, index: number) => void} onRowClick - Function to handle row click events
 *  @param {ContextMenuField<T>[]} contextMenuFields - Array of context menu fields to be displayed
 * @return {void}
 */
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

	/**
	 * calculateRow - Function to calculate a single row in the list
	 * @param {Record<string | keyof T, React.ReactNode>} currentElement - The element to be displayed in the row
	 * @param {T & Record<string, any>} currentValue - The data that the row is based on
	 * @param {number} index - The index of the row in the list
	 * @return {React.ReactNode} - The calculated row
	 */
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
	 * preComputedRowProps - This is a ref to the precomputed props of the list items
	 * It is used to store the precomputed props while the user is actively typing
	 */
	const preComputedRowProps = useRef<Record<keyof T | string, React.ReactNode>[] | null>(null);

	/**
	 * preComputedRows - This is a ref to the precomputed rows of the list
	 * It is used to store the precomputed rows while the user is actively typing
	 */
	const preComputedRows = useRef<React.ReactNode[] | null>(null);

	/**
	 * This effect is used to precompute the list item props after a few seconds of the user not actively typing
	 */
	useEffect(() => {
		setOptimizationLevel('None');
		preComputedRowProps.current = null;
		preComputedRows.current = null;

		// after a few seconds precompute the list item props
		let inner_timeout: NodeJS.Timeout | null = null;
		
		/**
		 * Sets a timeout to precompute the list item props after a few seconds.
		 * This is done to reduce the amount of work done while the user is actively typing.
		 */
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

	/**
	 * Row - This is a function that is used to calculate a single row in the list
	 * @param {{ index: number }} props - The props of the row
	 * @return {React.ReactNode} - The calculated row
	 */	
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

	/**
	 * columnLayout - This is a memoized function that is used to calculate the column layout
	 * @return {JSX.Element} - The calculated column layout
	 */
	const columnLayout = useMemo(() => {
		console.log('recalculated layout');
		return dataHandler.form.getColumnLayout(hiddenColumns);
	}, [dataHandler, hiddenColumns]);

	/**
	 * overscanCount - This is the number of extra rows that are rendered outside of the visible area
	 * It is used to improve the performance of the list by reducing the amount of work done when the user scrolls
	 */
	const [overscan, setOverscan] = useState(1);
	useEffect(() => {
		setOverscan(1);
		const timeout = setTimeout(() => {
			setOverscan(21);
		}, 2500);

		return () => clearTimeout(timeout);
	}, [data]);

	/**
	 * contextMenuContent - This is a state that is used to store the content of the context menu
	 * @type {React.ReactNode | null}
	 */
	const [contextMenuContent, setContextMenuContent] = useState<React.ReactNode | null>(null);

	/**
	 * handleContext - This is a function that is used to handle the context menu
	 * @param {number} index - The index of the row in the list
	 * @param {number} colIndex - The index of the column in the list
	 * @return {void}
	 */
	const handleContext = useCallback(
		(index: number, colIndex: number) => {
			// set key to the colIndex th key of the data's visible keys
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

	
	console.log('Hi there!');

	/**
	 * handleRowClick - This is a function that is used to handle the row click event
	 * @param {number} index - The index of the row in the list
	 * @return {void}
	 */
	const handleRowClick = useCallback(
		(index: number) => {
			onRowClick?.(data[index], index);
		},
		[data, onRowClick]
	);

	return (
		<>
