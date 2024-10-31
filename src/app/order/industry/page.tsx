'use client';

import EditableList from '@/forms/components/editable-list';
import { industryValidator } from '@/forms/schemas/order';

export default function IndustryPage() {
    return (
        <EditableList dataHandler={industryValidator} />
    )
}

