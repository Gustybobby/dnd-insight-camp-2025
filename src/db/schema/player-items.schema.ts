import { itemsTable } from "@/db/schema/items.schema";
import { playersTable } from "@/db/schema/players.schema";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

export const playerItemsTable = pgTable(
  "player_items",
  {
    playerId: integer("player_id")
      .notNull()
      .references(() => playersTable.id, { onDelete: "cascade" }),
    itemId: integer("item_id")
      .notNull()
      .references(() => itemsTable.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(),
  },
  (table) => [primaryKey({ columns: [table.playerId, table.itemId] })],
);
