'use client';

import EditableList from '@/forms/components/editable-list';
import { customerValidator } from '@/forms/schemas/order';

export default function CustomerPage() {
    return (
        <EditableList dataHandler={customerValidator} />
    )
}

