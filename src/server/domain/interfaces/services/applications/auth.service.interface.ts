import type { AuthSession } from "@/server/domain/interfaces/services/infrastructure";

export interface IAuthService {
  authPlayer(): Promise<AuthSession>;

  authSessionPlayer({ playerId }: { playerId: number }): Promise<AuthSession>;

  authStaff(): Promise<AuthSession>;
}
