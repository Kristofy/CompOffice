import { TRPCClientErrorLike, createTRPCReact } from '@trpc/react-query';

import { AppRouter } from '@/trpc/server/router';
import { DataHandler } from '@/forms/type-info';
import { UseQueryResult } from '@tanstack/react-query';
import { unit } from '@prisma/client';
import { UseTRPCMutationOptions, UseTRPCMutationResult } from '@trpc/react-query/shared';
import { AnyMutationProcedure } from '@trpc/server';
import { inferTransformedProcedureOutput } from '@trpc/server/shared';

export const trpc = createTRPCReact<AppRouter>({});

type getRoutes = Exclude<keyof typeof trpc.get, 'getQueryKey'>;
export function serverGet<T extends object>(dataHandler: DataHandler<T>) {
	const route = trpc.get[dataHandler.tableName as getRoutes]! as any;
	const useQuery = route.useQuery as () => UseQueryResult<T[], any>;
	return useQuery;
}

// serverGetByTableName
export function serverGetByTableName<T extends object>(tableName: string) {
	const route = trpc.get[tableName as getRoutes]! as any;
	const useQuery = route.useQuery as () => UseQueryResult<T[], any>;
	return useQuery;
}

type editRoutes = Exclude<keyof typeof trpc.post.edit, 'getQueryKey'>;
export function serverEdit<T extends object>(dataHandler: DataHandler<T>) {
	const route = trpc.post.edit[dataHandler.tableName as editRoutes]! as any;
	const useMutation = route.useMutation as <TContext = unknown>(
		opts?: UseTRPCMutationOptions<
			T,
			TRPCClientErrorLike<AnyMutationProcedure>,
			inferTransformedProcedureOutput<AnyMutationProcedure>,
			unknown
		>
	) => UseTRPCMutationResult<
		T & Record<string, any>,
		TRPCClientErrorLike<AnyMutationProcedure>,
		T,
		unknown
	>;
	return useMutation;
}

type createRoutes = Exclude<keyof typeof trpc.post.create, 'getQueryKey'>;
export function serverCreate<T extends object>(dataHandler: DataHandler<T>) {
	const route = trpc.post.create[dataHandler.tableName as createRoutes]! as any;
	const useMutation = route.useMutation as <TContext = unknown>(
		opts?: UseTRPCMutationOptions<
			T,
			TRPCClientErrorLike<AnyMutationProcedure>,
			inferTransformedProcedureOutput<AnyMutationProcedure>,
			unknown
		>
	) => UseTRPCMutationResult<
		T & Record<string, any>,
		TRPCClientErrorLike<AnyMutationProcedure>,
		T,
		unknown
	>;
	return useMutation;
}

type delRoutes = Exclude<keyof typeof trpc.del, 'getQueryKey'>;
export function serverDel<T extends object>(dataHandler: DataHandler<T>) {
	const route = trpc.del[dataHandler.tableName as delRoutes]! as any;
	const useMutation = route.useMutation as <TContext = unknown>(
		opts?: UseTRPCMutationOptions<
			T,
			TRPCClientErrorLike<AnyMutationProcedure>,
			inferTransformedProcedureOutput<AnyMutationProcedure>,
			unknown
		>
	) => UseTRPCMutationResult<
		T & Record<string, any>,
		TRPCClientErrorLike<AnyMutationProcedure>,
		T,
		unknown
	>;
	return useMutation;
}

// export const trpc = createTRPCNext<AppRouter>({
//   config(opts) {
//     if (typeof window !== 'undefined') {
//       return {
//         links: [
//           httpBatchLink({
//             url: '/api/trpc',
//           }),
//         ],
//       };
//     }
//     const url = process.env.VERCEL_URL
//       ? `https://${process.env.VERCEL_URL}/api/trpc`
//       : 'http://localhost:3000/api/trpc';
//     return {
//       links: {
//         http: httpBatchLink({
//           url,
//         }),
//       },
//     };
//   },
//   ssr: true,
//   responseMeta(opts) {
//     const { clientErrors } = opts;
//     if (clientErrors.length) {
//       // propagate http first error from API calls
//       return {
//         status: clientErrors[0].data?.httpStatus ?? 500,
//       };
//     }
//     // cache request for 1 day + revalidate once every second
//     const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
//     return {
//       headers: {
//         'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
//       },
//     };
//   },
// });
