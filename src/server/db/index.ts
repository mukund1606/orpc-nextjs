import { drizzle } from "drizzle-orm/mysql2";
import type { Pool } from "mysql2/promise";
import { createPool } from "mysql2/promise";

import { env } from "~/env";
import * as schema from "~/server/db/schema";

const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

const pool =
  globalForDb.pool ??
  createPool({
    uri: env.DATABASE_URL,
  });

if (env.NODE_ENV !== "production") globalForDb.pool = pool;

export const db = drizzle(pool, { schema, mode: "default" });
