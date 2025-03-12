import { z } from 'zod';
import { publicProcedure, router } from '~/server/api/orpc';

export const greetingRouter = router({
	name: publicProcedure
		.input(z.object({ body: z.object({ name: z.string() }) }))
		.output(z.object({ body: z.object({ greeting: z.string() }) }))
		.handler(async ({ input }) => {
			return {
				body: { greeting: `Greetings! ${input.body.name}` },
			};
		}),
});
