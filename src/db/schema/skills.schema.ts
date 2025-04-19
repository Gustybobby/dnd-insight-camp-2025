import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const skillsTable = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull().default(""),
  cooldown: integer("cooldown").notNull(),
  usableBossTurn: boolean("usable_boss_turn").notNull().default(false),
  cooldownCycleRef: text("cooldown_cycle_ref").default("SELF"),
});
