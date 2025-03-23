import type { IStaffRepository } from "@/server/domain/interfaces/repositories";
import type { Staff, User } from "@/server/domain/models";

import { db } from "@/db";
import { staffsTable } from "@/db/schema";
import { takeOne } from "@/db/util";
import { eq } from "drizzle-orm";

export class StaffRepository implements IStaffRepository {
  async getByUserId({ userId }: { userId: User["id"] }): Promise<Staff | null> {
    return db
      .select()
      .from(staffsTable)
      .where(eq(staffsTable.userId, userId))
      .then(takeOne);
  }
}
