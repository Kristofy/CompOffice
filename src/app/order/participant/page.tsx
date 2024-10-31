'use client';

import EditableList from '@/forms/components/editable-list';
import { participantValidator } from '@/forms/schemas/order';

export default function ParticipantPage() {
    return (
        <EditableList dataHandler={participantValidator} />
    )
}

