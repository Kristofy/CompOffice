'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schemaKeys, Validator } from '../type-info';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ValidatorFormItem from './form-item';

export default function ValidatorForm<T extends object>({
	validator,
	onSubmit,
}: {
	validator: Validator<T>;
	onSubmit: SubmitHandler<any>;
}) {
	const { formSchema: schema, apiSchema, schemaProperties, extras } = validator;

	const form = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: schemaKeys(schema)
			.map((k) => ({ [k]: extras[k]?.default || '' }))
			.reduce((acc, x) => ({ ...acc, ...x }), {}),
	});

	// function onSubmit(values: z.infer<typeof schema>) {
	// function onSubmit(data: any) {
	// 	const input = values as z.infer<typeof schema>;
	// 	const result = apiSchema.safeParse(input);
	// 	if (result.success) {
	// 		console.log(result.data);
	// 	} else {
	// 		console.log(result.error.errors);
	// 	}
	// }

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="container my-2 grid grid-cols-3 gap-3">
					{schemaKeys(schema).map((k) => {
						const key = k as string;
						const props = schemaProperties.get(k)!;
						const extra = extras[k];

						return (
							<ValidatorFormItem<T>
								key={key}
								name={key}
								schemaProps={props}
								extra={extra}
								form={form}
							/>
						);
					})}

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
}
