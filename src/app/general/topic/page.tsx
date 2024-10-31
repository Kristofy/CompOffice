'use client';

import EditableList from '@/forms/components/editable-list';
import { topicValidator } from '@/forms/schemas/services';

export default function TopicPage() {
    return (
        <EditableList dataHandler={topicValidator} />
    )
}
