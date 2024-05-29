'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DataHandler } from '../../type-info';
import DataHandlerFormItem from './form-item';
import { z } from 'zod';
import { OptimisticAction } from '../table/data-handler-table';
import toast from 'react-hot-toast';



export default function DataHandlerForm<T extends object>({
	dataHandler,
	onSubmit,
	currentFields,
	data,
}: {
	dataHandler: DataHandler<T>;
	onSubmit: SubmitHandler<any>;
	currentFields?: Record<string, any>;
	data: (T & Record<string, any>)[];
}) {
	// Lets get the fields and try get the props on the object, then try to coerce the value to a value that the form would expect

	// Default values in case of new form
	const defaultValues = Object.entries(dataHandler.columns.model.props)
		.map(([k, v]) => ({ [k]: v?.default ?? '' }))
		.reduce((acc, x) => ({ ...acc, ...x }), {})

	// The values that are currently in the form for editing
	const formCurrentFields = currentFields && Object.fromEntries(
		Object.entries(currentFields ?? {})
			.filter(([k, _]) => k in dataHandler.columns.model.props)
			.map(([k, v]) => {
				const props = dataHandler.columns.model.props[k];

				switch (props.type?.kind) {
					case 'number':
						return [k, v?.toString() ?? ''];
					case 'enum':
						return [k, v ?? ''];
					case 'string':
						return [k, v ?? ''];
					case 'connected':
						console.log("Base is: ", k, v)
						return [k, v.toString() ?? ''];
					default:
						return [k, v ?? ''];
				}
			})
	);


	console.log("The form values are: ", formCurrentFields);
	console.log("THe default values would be: ", defaultValues)

	const form = useForm({
		resolver: zodResolver(dataHandler.schema.form),
		mode: 'onChange',
		defaultValues: formCurrentFields ?? defaultValues,
	});

	// When this runs then the form schema is valid
	function handleSubmit(data: any) {
		const input = data as z.infer<typeof dataHandler.schema.form>;
		const result = dataHandler.schema.api.safeParse(input);
		if (result.success) {
			onSubmit(result.data)
		} else {
			result.error.errors.forEach((e) => {
				form.setError(e.path.join('\n'), { message: e.message });
			});
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} style={{ maxHeight: 'calc(100vh - 200px)' }}>
					<div
						className="m-7 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
						{Object.entries(dataHandler.columns.model.props).map(([k, props]) => (
							<DataHandlerFormItem<T>
								key={k as string}
								name={k as string}
								props={props}
								form={form}
								dataHandler={dataHandler}
								data={data}
							/>
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
