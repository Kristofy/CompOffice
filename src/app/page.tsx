'use client';

import { Input } from '@/components/ui/input';
import { useDeferredValue, useMemo, useState } from 'react';

export default function App() {
	const [test, setTest] = useState('hello');
	const defferedTest = useDeferredValue(test);
	const lst = useMemo(() => <p>Deffered Value: {defferedTest}</p>, [defferedTest]);
	return (
		<>
			<Input value={test} onChange={(e) => setTest(e.target.value)} />
			{lst}
		</>
	);
}
