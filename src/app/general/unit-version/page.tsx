'use client';

import EditableList from '@/forms/components/editable-list';
import { unitVersionValidator } from '@/forms/schemas/services';

export default function UnitPage() {

    return (
        <EditableList dataHandler={unitVersionValidator} />
    )
}
