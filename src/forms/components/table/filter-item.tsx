import { SetStateAction, useMemo } from 'react';

import { Input } from '@/components/ui/input';

import { DataHandler, FormProps } from '../../type-info';

/**
 * Represents an object with a filter property.
 */
export interface WithFilter<T> {
	data: T & Record<string, any>;
	filter: number;
}



/**
 * Props for the FilterItem component.
 */
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

/**
 * A component that represents a filter item.
 *
 * @template T - The type of the data object.
 *
 * @param {FilterItemProps<T>} props - The props for the FilterItem component.
 * @param {DataHandler<T>} props.dataHandler - The data handler.
 * @param {(value: SetStateAction<{ filter: ({ target, data }: { target: any; data: T & Record<string, any> }) => boolean; value: any; index: number; }> | null)} props.setFilterChanged - A function to set the filter changed state.
 * @param {(value: any, key: keyof T | string) => void} props.onChange - A function to handle the change event.
 * @param {string} props.value - The value of the filter item.
 * @param {() => void} props.onDone - A function to handle the "done" event.
 * @param {string} props.name - The name of the filter item.
 * @param {FormProps<T & Record<string, any>, any, 'All'>} props.props - The form props.
 * @param {number} props.index - The index of the filter item.
 * @returns {JSX.Element | null} The rendered filter item component.
 */
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

		switch (props.type?.kind) {
			case 'string':
				// TODO: Implement string filter
			default: 
				return (
					<Input
						key={name}
						name={name}
						type={props.type?.kind}
						placeholder={name}
						defaultValue={value}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								onDone();
							}
						}}
						onChange={(e) => {
							setFilterChanged({ filter: props.filter!, value: e.target.value, index });
							onChange(e.target.value, name);
						}}
					/>
				);
		}
	}, [index, name, onChange, onDone, props, setFilterChanged, value]);
	

	return element;
}
