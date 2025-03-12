import { RPCLink } from "@orpc/client/fetch";
import { InferRouterInputs, InferRouterOutputs } from "@orpc/server";

import { type ApiRouter } from "~/server/api/_app";

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const rpcLink = new RPCLink({
  url: new URL("/rpc", getBaseUrl()),
});

export type RouterInputs = InferRouterInputs<ApiRouter>;
export type RouterOutputs = InferRouterOutputs<ApiRouter>;
