import { usersTable } from "@/db/schema/users.schema";
import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .unique(),
});
