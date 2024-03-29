import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { FormProps } from '../../type-info';

interface FormItemProps<T extends object> {
	name: string;
	// children: React.ReactNode;
	props: FormProps<T, any>;
	form: UseFormReturn<{ [x: string]: any }, any, undefined>;
}

export default function ValidatorFormItem<T extends object>({
	name,
	props,
	form,
}: FormItemProps<T>) {
	type Field = ControllerRenderProps<
		{
			[x: string]: any;
		},
		string
	>;

	const inputElement = (field: Field) => {
		switch (props.type) {
			case 'number':
				return <Input type="number" {...field} />;
			case 'string':
				return (
					<>
						<Input type="text" {...field} />
					</>
				);
			default:
				return <Input type="text" {...field} />;
		}
	};

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex justify-center flex-col mt-0">
					<FormLabel>{field.name}</FormLabel>
					<FormControl>{inputElement(field)}</FormControl>
					<FormDescription>This is your public display name.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
