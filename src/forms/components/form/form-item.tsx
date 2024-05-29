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
import { useEffect } from 'react';
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

export default function DataHandlerFormItem<T extends object>({
	name,
	props,
	form,
	dataHandler,
	data,
}: FormItemProps<T>
) {
	type Field = ControllerRenderProps<
		{
			[x: string]: any;
		},
		string
	>;

	const inputElement = (field: Field) => {
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
