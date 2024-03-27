'use client';

import ValidatorForm from '@/forms/components/validator-form';
import { ValidatorList } from '@/forms/components/validator-list';
import { participantValiadator } from '@/forms/schemas/order';

export default function ParticipantPage() {
	return (
		<>
			<ValidatorForm dataHandler={participantValiadator} onSubmit={(data) => console.log(data)} />
			<ValidatorList validator={participantValiadator} />;
		</>
	);
}
