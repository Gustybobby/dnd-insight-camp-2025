import { pgEnum, pgTable } from "drizzle-orm/pg-core";

export const phaseEnum = pgEnum("phase_enum", [
  "Non-Active",
  "Choosing",
  "Playing",
]);

export const globalTable = pgTable("global", {
  phase: phaseEnum("phase").notNull().default("Non-Active"),
});
