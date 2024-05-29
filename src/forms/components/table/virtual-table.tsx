import React, {
	createContext,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

import { FixedSizeList, FixedSizeListProps } from 'react-window';

// Original source: https://github.com/bvaughn/react-window/issues/60#issuecomment-588397239

/** The virtual table. It basically accepts all of the same params as the original FixedSizeList.*/

/** Context for cross component communication */
const VirtualTableContext = createContext<{
	columnLayout: React.ReactNode;
	top: number;
	handleContextMenu: (e: React.MouseEvent) => void;
	handleRowClick: (e: React.MouseEvent) => void;
	setTop: (top: number) => void;
}>({
	columnLayout: <></>,
	top: 0,
	handleContextMenu: (e: React.MouseEvent) => { },
	handleRowClick: (e: React.MouseEvent) => { },
	setTop: (value: number) => { },
});

/**
 * The Inner component of the virtual list. This is the "Magic".
 * Capture what would have been the top elements position and apply it to the table.
 * Other than that, render an optional header and footer.
 **/
const Inner = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function Inner(
	{ children, ...rest },
	ref
) {
	const { top, columnLayout, handleContextMenu, handleRowClick } = useContext(VirtualTableContext);
	return (
		<div {...rest} ref={ref}>
			<table
				style={{ top, position: 'absolute', width: '100%' }}
				className="border-collapse border-2 table-fixed">
				{columnLayout}
				<tbody onContextMenu={handleContextMenu} onClick={handleRowClick}>
					{children}
				</tbody>
			</table>
		</div>
	);
});

export default function VirtualTable({
	columnLayout,
	row,
	onContextMenu,
	onRowClick,
	...rest
}: {
	columnLayout: JSX.Element;
	onContextMenu?: (index: number, colIndex: number, e: React.MouseEvent) => void;
	onRowClick?: (index: number) => void;
	row: FixedSizeListProps['children'];
} & Omit<FixedSizeListProps, 'children' | 'innerElementType'>) {
	const listRef = useRef<FixedSizeList | null>();
	const [top, setTop] = useState(0);
	const topRef = useRef(top);

	topRef.current = top;

	const handleRowClick = useCallback(
		(e: React.MouseEvent) => {
			if (!onRowClick) return;

			const top = topRef.current;
			const { clientY } = e;
			const { top: rectTop } = e.currentTarget.getBoundingClientRect();

			const windowListY = clientY - rectTop;
			const listY = windowListY + top;
			const clickedRowIndex = Math.floor(listY / rest.itemSize);
			onRowClick(clickedRowIndex);
		},
		[onRowClick, rest.itemSize]
	);

	const columnLayoutRef = useRef<HTMLTableColElement>(null);
	// optional: save the width of the window using state
	const [width, setWidth] = useState(window.innerWidth); // check width size of the window

	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const columnLayoutWithRef = React.cloneElement(columnLayout, {
		ref: columnLayoutRef,
	});

	const handleContextMenu = useCallback(
		(e: React.MouseEvent) => {

			if (!onContextMenu) return;

			const colStarts = (() => {
				const cols = columnLayoutRef.current?.children ?? [];

				const widths = (Array.from(cols).map(
					(col: any) => (col as HTMLTableColElement).clientWidth
				) ?? []) as number[];

				return widths.reduce(
					(acc, width) => {
						acc.push(acc[acc.length - 1] + width);
						return acc;
					},
					[0]
				);
			})();

			const top = topRef.current;

			const { clientX, clientY } = e;
			const { top: rectTop, left } = e.currentTarget.getBoundingClientRect();

			const windowListY = clientY - rectTop;
			const listY = windowListY + top;
			const clickedRowIndex = Math.floor(listY / rest.itemSize);

			// Lets figure out which column was clicked -> what is the key

			const x = clientX - left;
			const clickedColumnIndex = colStarts.findIndex((start) => start > x) - 1;

			onContextMenu(clickedRowIndex, clickedColumnIndex, e);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[onContextMenu, rest.itemSize, width]
	);

	return (
		<div>
			<VirtualTableContext.Provider
				value={{
					top,
					setTop,
					columnLayout: columnLayoutWithRef,
					handleContextMenu,
					handleRowClick,
				}}>
				<FixedSizeList
					{...rest}
					innerElementType={Inner}
					onItemsRendered={(props) => {
						// @ts-ignore private method access
						const t = listRef.current?._getItemStyle(props.overscanStartIndex)?.top ?? 0;
						setTop(t);

						// Call the original callback
						rest.onItemsRendered?.(props);
					}}
					ref={(el) => {
						if (!!el) listRef.current = el;
					}}>
					{row}
				</FixedSizeList>
			</VirtualTableContext.Provider>
		</div>
	);
}
