import "server-only";

import { ORPCError, os } from "@orpc/server";
import { cookies, headers } from "next/headers";
import { cache } from "react";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

// TODO: Implement auth and db
/**
 * INITIALIZE ORPC
 */
export const createORPCContext = cache(async () => {
  const session = await auth();

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
export const base = os
  .$context<ORPCContext>()
  .$route({
    inputStructure: "detailed",
    outputStructure: "detailed",
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
      throw new ORPCError(
        "UNAUTHORIZED",
        // { message: 'Unauthorized' } // NOTE: Can add custom message like this
      );
    }

    return next({
      context: {
        session: context.session,
      },
    });
  },
);
