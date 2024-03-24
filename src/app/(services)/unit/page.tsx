'use client';

import { trpc } from '@/trpc/client/client';
import { columns } from './columns';
import { DataTable } from './data-table';
import ValidatorForm from '@/forms/components/validator-form';
import { SubmitHandler } from 'react-hook-form';
import { unitValidator } from '@/forms/schemas/services';
import { z } from 'zod';

export default function DemoPage() {
	const { data: units, status: unitStatus } = trpc.get.units.useQuery();
	const { mutate, error, data, status } = trpc.set.useMutation();

	const onSubmitHandler: SubmitHandler<any> = (data: z.infer<typeof unitValidator.formSchema>) => {
		// console.log(data);
		mutate({
			id: data.id,
			code: data.code,
		});
	};

	return (
		<div className="container mx-auto py-10">
			<ValidatorForm validator={unitValidator} onSubmit={onSubmitHandler} />

			{status === 'idle' && 'Submit the form to update the unit code'}
			{status === 'loading' && 'Loading...'}
			{status === 'error' && 'Error!' + error.message}
			{status === 'success' && JSON.stringify(data)}

			<hr />
			{unitStatus === 'loading' && 'Loading...'}
			{unitStatus === 'error' && 'Error!'}
			{unitStatus === 'success' && <DataTable columns={columns} data={units} />}
		</div>
	);
}
