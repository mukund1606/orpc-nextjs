import { createRouterClient } from '@orpc/server';
import { createORPCContext, router } from '~/server/api/orpc';

import { greetingRouter } from './greeting';

export const apiRouter = router({
	greeting: greetingRouter,
});

export type ApiRouter = typeof apiRouter;

export const api = createRouterClient(apiRouter, {
	context: createORPCContext,
});
