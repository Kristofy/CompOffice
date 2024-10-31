'use client';

import EditableList from '@/forms/components/editable-list';
import { unitValidator } from '@/forms/schemas/services';

export default function UnitPage() {
    return (
        <EditableList dataHandler={unitValidator} />
    )
}
