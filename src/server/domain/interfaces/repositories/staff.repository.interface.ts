import type { Staff, User } from "@/server/domain/models";

export interface IStaffRepository {
  getByUserId({ userId }: { userId: User["id"] }): Promise<Staff | null>;
}
