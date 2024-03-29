import { SetStateAction, useMemo } from 'react';

import { Input } from '@/components/ui/input';

import { DataHandler, FormProps } from '../../type-info';

export interface WithFilter<T> {
	data: T & Record<string, any>;
	filter: number;
}

interface FilterItemProps<T extends object> {
	dataHandler: DataHandler<T>;
	setFilterChanged: (
		value: SetStateAction<{
			filter: ({ target, data }: { target: any; data: T & Record<string, any> }) => boolean;
			value: any;
			index: number;
		} | null>
	) => void;
	onChange: (value: any, key: keyof T | string) => void;
	value: string;
	onDone: () => void;
	name: string;
	props: FormProps<T & Record<string, any>, any, 'All'>;
	index: number;
}

export default function FilterItem<T extends object>({
	dataHandler,
	setFilterChanged,
	onChange,
	value,
	onDone,
	name,
	props,
	index,
}: FilterItemProps<T>) {
	const element = useMemo(() => {
		if (!props.filter) {
			return null;
		}

		return (
			<Input
				key={name}
				name={name}
				type={props.type}
				placeholder={name}
				defaultValue={value}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						onDone();
					}
				}}
				onChange={(e) => {
					setFilterChanged({ filter: props.filter!, value: e.target.value, index: index });
					onChange(e.target.value, name);
				}}
			/>
		);
	}, [index, name, onChange, onDone, props, setFilterChanged, value]);

	return element;
}
