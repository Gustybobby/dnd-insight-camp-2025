import type { AuthSession } from "@/server/domain/interfaces/services/infrastructure";

export interface IAuthService {
  authPlayer(): Promise<AuthSession>;

  authStaff(): Promise<AuthSession>;
}
