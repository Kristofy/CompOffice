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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"


import { DataHandler, FormProps } from '../../type-info';
import { useEffect, useState } from 'react';
import { serverGet, serverGetByTableName } from '@/trpc/client/client';
import ConnectedFormItem from './items/connected';

interface FormItemProps<T extends object> {
	name: string;
	// children: React.ReactNode;
	props: FormProps<T, any>;
	form: UseFormReturn<{ [x: string]: any }, any, undefined>;
	dataHandler: DataHandler<T>;
	data: (T & Record<string, any>)[];
}

/**
 * Renders a form item based on the provided props.
 *
 * @template T - The type of the object being rendered.
 * @param {FormItemProps<T>} props - The props for the form item.
 * @param {string} props.name - The name of the form item.
 * @param {FormProps<T, any>} props.props - The props for the form item.
 * @param {UseFormReturn<{ [x: string]: any }, any, undefined>} props.form - The form hook.
 * @param {DataHandler<T>} props.dataHandler - The data handler for the form item.
 * @param {(T & Record<string, any>)[]} props.data - The data for the form item.
 * @return {JSX.Element} The rendered form item.
 */
export default function DataHandlerFormItem<T extends object>({
	name,
	props,
	form,
	dataHandler,
	data,
}: FormItemProps<T>
): JSX.Element {
	type Field = ControllerRenderProps<
		{
			[x: string]: any;
		},
		string
	>;

/**
 * Generates the input element based on the type of the field.
 *
 * @param {Field} field - The field object.
 * @return {JSX.Element} The generated input element.
 */
	const inputElement = (field: Field): JSX.Element => {
		console.log("props.type?.kind):", props.type?.kind)
		switch (props.type?.kind) {
			case 'string':
				return <Input type="text" {...field} />;
			case 'number':
				return <Input type="number" {...field} />;
			case 'enum':
				return (
					// <select >
					// 	{props.type.possibleValues.map(({ label, value }) => (
					// 		<option key={label} value={value}>
					// 			{label}
					// 		</option>
					// 	))}
					// </select>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{props.type.possibleValues.map(({ label, value }: { label: string, value: string }) => (
								<SelectItem key={label} value={value}>{label}</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			case 'connected':
				return (
					<ConnectedFormItem
						field={field}
						props={props as any}
					/>
				)

			default:
				return <Input type="text" {...field} />;
		}
	};
	const [dependency1, setDependency1] = useState();
	const [dependency2, setDependency2] = useState();
	useEffect(() => {
		// This is the callback function that will be executed when the component mounts or when the dependencies change.
	  }, [dependency1, dependency2]); // This is an optional dependency array.
	
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex justify-center flex-col mt-0">
					<FormLabel>{props.displayName ?? field.name}</FormLabel>
					<FormControl>{inputElement(field)}</FormControl>
					<FormDescription>This is your public display name.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
