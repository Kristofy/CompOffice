import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { FormExtras, SchemaProperties } from '../type-info';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface FormItemProps<T> {
	name: string;
	// children: React.ReactNode;
	schemaProps: SchemaProperties;
	extra: FormExtras<T>;
	form: UseFormReturn<{ [x: string]: any }, any, undefined>;
}

export default function ValidatorFormItem<T>({ name, schemaProps, extra, form }: FormItemProps<T>) {
	type Field = ControllerRenderProps<
		{
			[x: string]: any;
		},
		string
	>;

	const inputElement = (field: Field) => {
		switch (extra.type) {
			case 'number':
				return <Input type="number" {...field} />;
			case 'string':
				return (
					<>
						<Input type="text" {...field} />
					</>
				);
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
