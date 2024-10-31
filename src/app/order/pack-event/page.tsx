'use client';

import EditableList from '@/forms/components/editable-list';
import { packEventValidator } from '@/forms/schemas/services';

export default function PackEventPage() {
    return (
        <EditableList dataHandler={packEventValidator} />
    )
}
