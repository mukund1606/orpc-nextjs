// import { createRouterClient } from '@orpc/server';
import { router } from '~/server/api/orpc';

import greetingRouter from './greeting';

export const apiRouter = router({
	greeting: greetingRouter,
	// lazyGreetings: os.lazy(() => import('./greeting')), // This is throwing an error
});

export type ApiRouter = typeof apiRouter;

// Do I need this?? This doesn't work if I import it in client.tsx
// export const api = createRouterClient(apiRouter, {
// 	context: createORPCContext,
// });
