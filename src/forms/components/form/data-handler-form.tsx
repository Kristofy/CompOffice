'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DataHandler } from '../../type-info';
import ValidatorFormItem from './form-item';

export default function DataHandlerForm<T extends object>({
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
				<form onSubmit={form.handleSubmit(onSubmit)} style={{ maxHeight: 'calc(100vh - 200px)' }}>
					<div
						// className="m-7 flex flex-row flex-wrap gap-8"
						className="m-7 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
						{Object.entries(dataHandler.columns.model.props).map(([k, props]) => (
							// <div key={k as string} className="flex-auto min-w-fit">
							<ValidatorFormItem<T>
								key={k as string}
								name={k as string}
								props={props}
								form={form}
							/>
							// </div>
						))}
					</div>

					<Button type="submit" className="m-7 hover:bg-accent float-end">
						Submit
					</Button>
				</form>
			</Form>
		</>
	);
}
