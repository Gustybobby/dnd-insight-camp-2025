import { itemsTable } from "@/db/schema/items.schema";
import { playersTable } from "@/db/schema/players.schema";
import { integer, pgEnum, pgTable, primaryKey } from "drizzle-orm/pg-core";

export const equipmentPartEnum = pgEnum("equipment_part", [
  "Armor",
  "Gear",
  "Sword",
]);

export const playerEquipmentsTable = pgTable(
  "player_equipments",
  {
    playerId: integer("player_id")
      .notNull()
      .references(() => playersTable.id, { onDelete: "cascade" }),
    itemId: integer("item_id")
      .notNull()
      .references(() => itemsTable.id, { onDelete: "cascade" }),
    part: equipmentPartEnum("part").notNull(),
  },
  (table) => [primaryKey({ columns: [table.playerId, table.itemId] })],
);
