'use client';

import { createORPCReactQueryUtils } from '@orpc/react-query';
import { type InferRouterInputs, type InferRouterOutputs } from '@orpc/server';
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import { createQueryClient } from '~/lib/orpc/query-client';
import { apiClient } from '~/lib/orpc/server';
import { ApiRouter } from '~/server/api/_app';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return createQueryClient();
	}
	// Browser: use singleton pattern to keep the same query client
	return (clientQueryClientSingleton ??= createQueryClient());
};

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = InferRouterInputs<ApiRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = InferRouterOutputs<ApiRouter>;

export function ORPCReactProvider(props: { children: React.ReactNode }) {
	const [queryClient] = useState(() => getQueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}

export const orpc = createORPCReactQueryUtils(apiClient);
