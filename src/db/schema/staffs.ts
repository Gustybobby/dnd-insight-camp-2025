import { pgTable, serial } from "drizzle-orm/pg-core";

export const staffsTable = pgTable("staffs", {
  id: serial("id").primaryKey(),
});
