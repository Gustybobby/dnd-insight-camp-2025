import { itemsTable } from "@/db/schema/items.schema";
import { timestamptz } from "@/db/util";
import { integer, pgTable, serial } from "drizzle-orm/pg-core";

export const effectsTable = pgTable("effects", {
  id: serial("id").primaryKey(),
  itemId: integer("item_id").references(() => itemsTable.id),
  createdAt: timestamptz("created_at").defaultNow().notNull(),
});
