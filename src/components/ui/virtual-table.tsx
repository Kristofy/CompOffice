import { createContext, forwardRef, useContext, useRef, useState } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';

// Original source: https://github.com/bvaughn/react-window/issues/60#issuecomment-588397239

/** The virtual table. It basically accepts all of the same params as the original FixedSizeList.*/

/** Context for cross component communication */
const VirtualTableContext = createContext<{
	columnLayout: React.ReactNode;
	header: React.ReactNode;
	top: number;
	setTop: (top: number) => void;
}>({
	columnLayout: <></>,
	header: <></>,
	top: 0,
	setTop: (value: number) => {},
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
	const { top, columnLayout, header } = useContext(VirtualTableContext);
	return (
		<div {...rest} ref={ref}>
			<table
				style={{ top, position: 'absolute', width: '100%' }}
				className="border-collapse border-2 table-fixed">
				{header}
				{columnLayout}
				<tbody>{children}</tbody>
			</table>
		</div>
	);
});

export function VirtualTable({
	columnLayout,
	header,
	row,
	...rest
}: {
	columnLayout?: React.ReactNode;
	header?: React.ReactNode;
	row: FixedSizeListProps['children'];
} & Omit<FixedSizeListProps, 'children' | 'innerElementType'>) {
	const listRef = useRef<FixedSizeList | null>();
	const [top, setTop] = useState(0);

	return (
		<VirtualTableContext.Provider value={{ top, setTop, columnLayout, header }}>
			<FixedSizeList
				{...rest}
				innerElementType={Inner}
				onItemsRendered={(props) => {
					const style =
						listRef.current &&
						// @ts-ignore private method access
						listRef.current._getItemStyle(props.overscanStartIndex);
					setTop((style && style.top) || 0);

					// Call the original callback
					rest.onItemsRendered && rest.onItemsRendered(props);
				}}
				ref={(el) => (listRef.current = el)}>
				{row}
			</FixedSizeList>
		</VirtualTableContext.Provider>
	);
}
