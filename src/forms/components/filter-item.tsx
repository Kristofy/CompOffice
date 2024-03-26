import { Input } from '@/components/ui/input';
import { FormExtras, Validator } from '../type-info';
import { SetStateAction } from 'react';

export interface WithFilter<T> {
	data: T;
	filter: number;
}

export function getFilters<T extends object>(
	validator: Validator<T>,
	setFilterChanged: (
		value: SetStateAction<{
			filter: (target: any, data: T) => boolean;
			value: string;
			index: number;
		} | null>
	) => void,
	setValue: (value: Record<keyof T, string>) => void,
	value: Record<keyof T, string>
) {
	return Object.fromEntries(
		Object.entries<FormExtras<T>>(validator.extras).map(([key, extras], index) => {
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
							[key as keyof T]: e.target.value,
						});
					}}
				/>,
			] as [keyof T, JSX.Element];

			return entry;
		}) as [keyof T, JSX.Element | null][]
	) as Record<keyof T, JSX.Element | null>;
}
