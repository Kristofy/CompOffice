'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z, ZodObject, ZodRawShape } from 'zod';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ValidatorForm<T>({ validator }: { validator: Validator<T> }) {
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

	const onSubmit: SubmitHandler<any> = (data) => {
		const input = apiSchema.safeParse(data as z.infer<typeof schema>);

		if (input.success) {
			console.log(input.data);
		} else {
			console.error(input.error.errors);
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="container my-2 grid grid-cols-3 gap-3">
					{schemaKeys(schema).map((k) => {
						const key = k as string;
						const props = schemaProperties.get(k);
						const extra = extras[k];

						return (
							<FormField
								key={key}
								control={form.control}
								name={key}
								render={({ field }) => (
									<FormItem className="flex justify-center flex-col mt-0">
										<FormLabel>{field.name}</FormLabel>
										<FormControl>
											<Input {...field} type={extra.type} />
										</FormControl>
										<FormDescription>This is your public display name.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
					})}

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
}
