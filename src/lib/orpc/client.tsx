'use client';

import { createORPCReactQueryUtils } from '@orpc/react-query';
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import { createQueryClient } from '~/lib/orpc/query-client';
import { api } from '~/lib/orpc/server';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return createQueryClient();
	}
	// Browser: use singleton pattern to keep the same query client
	return (clientQueryClientSingleton ??= createQueryClient());
};

export function ORPCReactProvider(props: { children: React.ReactNode }) {
	const [queryClient] = useState(() => getQueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}

export const orpc = createORPCReactQueryUtils(api);
