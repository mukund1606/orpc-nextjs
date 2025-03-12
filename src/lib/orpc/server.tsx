import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import {
	InferRouterInputs,
	InferRouterOutputs,
	RouterClient,
} from '@orpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cache } from 'react';

import { createQueryClient } from '~/lib/orpc/query-client';
import { type ApiRouter } from '~/server/api/_app';

export const getQueryClient = cache(createQueryClient);

export function HydrateClient(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient();
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{props.children}
		</HydrationBoundary>
	);
}

function getBaseUrl() {
	if (typeof window !== 'undefined') return window.location.origin;
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

const rpcLink = new RPCLink({
	url: new URL('/rpc', getBaseUrl()),
});

// This works with client.tsx
export const api: RouterClient<ApiRouter> = createORPCClient(rpcLink);

export type RouterInputs = InferRouterInputs<ApiRouter>;
export type RouterOutputs = InferRouterOutputs<ApiRouter>;
