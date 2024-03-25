import { Input } from '@/components/ui/input';
import { FormExtras, Validator } from '../type-info';

export interface WithFilter<T> {
	data: T;
	filter: number;
}

export function getFilters<T>(
	validator: Validator<T>,
	callback: (filter: (target: any, data: T) => boolean, value: string, index: number) => void,
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
					value={value[key as keyof T]}
					onChange={(e) => {
						callback(filter, e.target.value, index);
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
