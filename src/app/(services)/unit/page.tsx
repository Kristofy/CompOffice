'use client';

import { trpc } from '@/trpc/client/client';
import ValidatorForm from '@/forms/components/validator-form';
import { unitValidator } from '@/forms/schemas/services';
import { ValidatorList } from '@/forms/components/validator-list';

export default function UnitPage() {
	console.log('update unit page');

	return (
		// <div className="container mx-auto py-10 h-full w-full flex flex-col">
		<ValidatorList validator={unitValidator} />
		// </div>
	);
}
