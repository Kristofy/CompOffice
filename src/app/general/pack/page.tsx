'use client';

import EditableList from '@/forms/components/editable-list';
import { packValidator } from '@/forms/schemas/services';

export default function PackPage() {
    return (
        <EditableList dataHandler={packValidator} />
    )
}
