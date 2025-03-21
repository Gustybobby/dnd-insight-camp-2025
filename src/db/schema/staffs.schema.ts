import { usersTable } from "@/db/schema/users.schema";
import { pgTable, serial, uuid } from "drizzle-orm/pg-core";

export const staffsTable = pgTable("staffs", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id)
    .unique(),
});
