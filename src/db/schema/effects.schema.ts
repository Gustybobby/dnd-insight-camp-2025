import { itemsTable } from "@/db/schema/items.schema";
import { playerStatTypeEnum } from "@/db/schema/player-stats.schema";
import { timestamptz } from "@/db/util";
import { integer, pgEnum, pgTable, serial } from "drizzle-orm/pg-core";

export const effectTypeEnum = pgEnum("effect_type", [
  "Mod",
  "Provoked",
  "Fortitude",
  "Charmed",
  "Advantage",
  "Disadvantage",
]);

export const effectsTable = pgTable("effects", {
  id: serial("id").primaryKey(),
  type: effectTypeEnum("type").notNull(),
  stat: playerStatTypeEnum("stat"),
  value: integer("value"),
  itemId: integer("item_id").references(() => itemsTable.id),
  countdown: integer("countdown"),
  createdAt: timestamptz("created_at").defaultNow().notNull(),
});
