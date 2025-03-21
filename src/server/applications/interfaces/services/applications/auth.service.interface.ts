import type { AuthSession } from "@/server/applications/interfaces/services/infrastructure";

export interface IAuthService {
  authPlayer(): Promise<AuthSession>;

  authStaff(): Promise<AuthSession>;
}
