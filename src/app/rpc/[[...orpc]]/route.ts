import { RPCHandler, serve } from '@orpc/server/next';

import { apiRouter } from '~/server/api/_app';
import { createORPCContext } from '~/server/api/orpc';

const handler = new RPCHandler(apiRouter);

export const { GET, POST, PUT, PATCH, DELETE } = serve(handler, {
	prefix: '/rpc',
	context: createORPCContext,
});
