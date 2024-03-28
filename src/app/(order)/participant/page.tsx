'use client';

import DataHandlerForm from '@/forms/components/form/data-handler-form';
import DataHandlerTable from '@/forms/components/table/data-handler-table';
import { participantValiadator } from '@/forms/schemas/order';

export default function ParticipantPage() {
	return (
		<>
			<DataHandlerForm dataHandler={participantValiadator} onSubmit={(data) => console.log(data)} />
			<DataHandlerTable dataHandler={participantValiadator} />;
		</>
	);
}
