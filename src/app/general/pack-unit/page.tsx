'use client';

import EditableList from '@/forms/components/editable-list';
import { packUnitValidator } from '@/forms/schemas/services';

export default function PackUnitPage() {
    return (
        <EditableList dataHandler={packUnitValidator} />
    )
}
