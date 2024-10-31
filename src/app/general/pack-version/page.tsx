'use client';

import EditableList from '@/forms/components/editable-list';
import { packVersionValidator } from '@/forms/schemas/services';

export default function PackVersionPage() {
    return (
        <EditableList dataHandler={packVersionValidator} />
    )
}
