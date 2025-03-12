import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_KEY: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_KEY: "NEXT_PUBLIC_KEY",
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
