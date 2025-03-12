import "server-only";

import { createORPCReactQueryUtils } from "@orpc/react-query";
import { createRouterClient } from "@orpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cache } from "react";

import { createQueryClient } from "~/lib/orpc/query-client";
import { apiRouter } from "~/server/api/_app";
import { createORPCContext } from "~/server/api/orpc";

export const getQueryClient = cache(createQueryClient);

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export const api = createRouterClient(apiRouter, {
  context: createORPCContext,
});
export const serverQuery = createORPCReactQueryUtils(api);
