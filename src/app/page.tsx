'use client';

import ValidatorForm from '@/forms/components/validator-form';
import { unitValidator } from '@/forms/schemas/services';

export default function App() {
	return <ValidatorForm validator={unitValidator} />;
}
