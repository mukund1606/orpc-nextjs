import 'server-only';

import { ORPCError, os } from '@orpc/server';
import { cookies, headers } from 'next/headers';
import { cache } from 'react';

import { env } from '~/env';

// TODO: Implement auth and db
const auth = {
	user: {
		id: '1',
		name: 'John Doe',
		email: 'john.doe@example.com',
		role: 'admin',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
};

const getSession = cache(async () => {
	const isSession = true;

	if (!isSession) {
		return null;
	}

	return auth;
});

const db = () => 'db';

/**
 * INITIALIZE ORPC
 */
export const createORPCContext = cache(async () => {
	const session = await getSession();

	return {
		db,
		session,
		headers: await headers(),
		cookies: await cookies(),
		env,
	};
});

export type ORPCContext = Awaited<ReturnType<typeof createORPCContext>>;

/**
 * CREATE BASE ROUTER
 */
const base = os
	.$context<ORPCContext>()
	.$route({
		inputStructure: 'detailed',
		outputStructure: 'detailed',
	})
	.use(async ({ next }) => {
		return next({
			context: await createORPCContext(),
		});
	});

export const router = base.router.bind(base);

/**
 * Public and protected routes
 */
export const publicProcedure = base;

export const privateProcedure = publicProcedure.use(
	async ({ context, next }) => {
		if (!context.session) {
			throw new ORPCError('UNAUTHORIZED', {
				message: 'Unauthorized',
			});
		}

		return next({
			context: {
				...context,
				session: context.session,
			},
		});
	}
);
