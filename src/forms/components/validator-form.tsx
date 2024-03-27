'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { DataHandler } from '../type-info';

export default function ValidatorForm<T extends object>({
	dataHandler,
	onSubmit,
}: {
	dataHandler: DataHandler<T>;
	onSubmit: SubmitHandler<any>;
}) {
	const form = useForm({
		resolver: zodResolver(dataHandler.schema.form),
		mode: 'onChange',
		defaultValues: Object.entries(dataHandler.columns.model.props)
			.map(([k, v]) => ({ [k]: v?.default || '' }))
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
					{Object.entries(dataHandler.columns.model.props).map(([k, props]) => {
						return (
							<ValidatorFormItem<T>
								key={k as string}
								name={k as string}
								props={props}
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
