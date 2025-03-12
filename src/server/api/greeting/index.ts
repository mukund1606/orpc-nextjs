import { z } from "zod";
import { publicProcedure } from "~/server/api/orpc";

const greetingRouter = {
  name: publicProcedure
    .input(z.object({ body: z.object({ name: z.string() }) }))
    .handler(async ({ input }) => {
      const greeting = `Greetings! ${input.body.name}` as const;
      const data = {
        body: {
          greeting,
        },
      };
      return data;
    }),
};

export default greetingRouter;
