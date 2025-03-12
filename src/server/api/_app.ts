import greetingRouter from "./greeting";
import { base } from "./orpc";

export const apiRouter = {
  greeting: greetingRouter,
  lazyGreetings: base.lazy(() => import("./greeting")),
};

export type ApiRouter = typeof apiRouter;
