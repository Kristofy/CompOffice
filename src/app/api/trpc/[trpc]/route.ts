// import { fetchRequestHandler } from '@trcp/server/adapters/fetch';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '@/trpc/server/router';

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		createContext: () => ({}),
	});

export { handler as GET, handler as POST };
