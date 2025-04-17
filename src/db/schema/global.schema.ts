import { pgEnum, pgTable, serial } from "drizzle-orm/pg-core";

export const phaseEnum = pgEnum("phase_enum", [
  "Non-Active",
  "Choosing",
  "Playing",
]);

export const globalTable = pgTable("global", {
  id: serial("id").primaryKey(),
  phase: phaseEnum("phase").notNull().default("Non-Active"),
});
