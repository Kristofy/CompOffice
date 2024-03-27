import { Input } from '@/components/ui/input';
import { SetStateAction } from 'react';
import { DataHandler } from '../type-info';

export interface WithFilter<T> {
	data: T & Record<string, any>;
	filter: number;
}

export function getFilters<T extends object>(
	dataHandler: DataHandler<T>,
	setFilterChanged: (
		value: SetStateAction<{
			filter: (target: any, data: T) => boolean;
			value: string;
			index: number;
		} | null>
	) => void,
	setValue: (value: Record<keyof T | string, string>) => void,
	value: Record<keyof T | string, string>
) {
	return Object.fromEntries(
		Object.entries(dataHandler.columns.all).map(([key, extras], index) => {
			const filter = extras.filter;
			if (!filter) {
				return [key, null];
			}
			const entry = [
				key,
				<Input
					key={key}
					name={key}
					type={extras.type}
					placeholder={key}
					defaultValue={value[key as keyof T]}
					onChange={(e) => {
						setFilterChanged({ filter: filter, value: e.target.value, index: index });
						setValue({
							...value,
							[key as keyof T | string]: e.target.value,
						});
					}}
				/>,
			] as [keyof T, JSX.Element];

			return entry;
		}) as [keyof T, JSX.Element | null][]
	) as Record<keyof T, JSX.Element | null>;
}
