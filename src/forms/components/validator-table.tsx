import { schemaKeys, Validator } from '../type-info';
import { VirtualTable } from '@/components/ui/virtual-table';
import AutoResizer from 'react-virtualized-auto-sizer';

// row is a function from (data, index) => React.ReactNode
export default function ValidatorTable<T>({
	row,
	data,
	validator,
	size,
	variant = 'virtual',
}: {
	row: ({ data, index }: { data: T; index: number }) => Record<keyof T, React.ReactNode>;
	data: T[];
	validator: Validator<T>;
	size: number;
	variant?: 'virtual' | 'normal';
}) {
	const HeaderElement = (
		<thead>
			<tr>
				{schemaKeys(validator.formSchema).map((key) => (
					<th key={key as string} className="text-left">
						{key as string}
					</th>
				))}
			</tr>
		</thead>
	);

	const Row = ({ index }: { index: number }) => {
		const rows = row({ data: data[index], index: index });
		const keys = Object.keys(rows) as (keyof T)[];
		return (
			<tr className={`hover:bg-slate-700 ${index % 2 ? 'bg-zinc-600' : 'bg-slate-500'}`}>
				{keys.map((key) => (
					<td key={key as string} className="m-0 p-0">
						<div style={{ display: 'block', height: size, overflow: 'hidden' }}>{rows[key]}</div>
					</td>
				))}
			</tr>
		);
	};

	return (
		<div className="mb-3 flex-1">
			<div className="block w-full h-full">
				<AutoResizer>
					{({ height, width }) => (
						<VirtualTable
							height={height}
							width={width}
							itemCount={data.length}
							itemSize={size}
							overscanCount={10}
							row={Row}
						/>
					)}
				</AutoResizer>
			</div>
		</div>
	);
}
