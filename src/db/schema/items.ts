import { pgTable, serial } from "drizzle-orm/pg-core";

export const itemsTable = pgTable("items", {
  id: serial("id").primaryKey(),
});
