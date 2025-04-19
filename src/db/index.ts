import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import type { PgTransaction } from "drizzle-orm/pg-core";

import { drizzle } from "drizzle-orm/node-postgres";

import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle({
  client: pool,
  logger: process.env.NODE_ENV === "development",
});

export type DBTransactionClient = PgTransaction<
  NodePgQueryResultHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>;
