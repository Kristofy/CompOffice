import { VirtualTable } from '@/components/ui/virtual-table';
import AutoResizer from 'react-virtualized-auto-sizer';
import { DataHandler } from '../type-info';

// row is a function from (data, index) => React.ReactNode
export function ValidatorTable<T extends object>({
	row,
	data,
	validator: dataHandler,
	size,
	header,
	variant = 'virtual',
}: {
	row: ({ data, index }: { data: T; index: number }) => Record<keyof T, React.ReactNode>;
	data: T[];
	validator: DataHandler<T>;
	size: number;
	header?: React.ReactNode;
	variant?: 'virtual' | 'normal';
}) {
	const Row = ({ index }: { index: number }) => {
		const rows = row({ data: data[index], index: index });
		const keys = Object.keys(rows) as (keyof T)[];
		return (
			<tr className={`hover:bg-accent ${index % 2 ? 'bg-secondary' : 'bg-secondary/75'}`}>
				{keys.map((key) => (
					<td key={key as string} className="m-0 p-0">
						<div style={{ display: 'block', height: size, overflow: 'hidden' }}>{rows[key]}</div>
					</td>
				))}
			</tr>
		);
	};

	return (
		<div className="mb-3 flex-1 rounded-t-3xl overflow-hidden">
			<div className="block w-full h-full">
				<AutoResizer>
					{({ height, width }) => (
						<VirtualTable
							height={height}
							width={width}
							itemCount={data.length}
							itemSize={size}
							overscanCount={50}
							header={header}
							columnLayout={<colgroup>{dataHandler.form.columnLayout}</colgroup>}
							row={Row}
						/>
					)}
				</AutoResizer>
			</div>
		</div>
	);
}
