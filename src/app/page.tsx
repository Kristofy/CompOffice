'use client';

import { trpc } from '@/trpc/client/client';

export default function App() {
	const { data } = trpc.get.units.useQuery();

	return <div>{JSON.stringify(data)}</div>;
}
