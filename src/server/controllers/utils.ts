import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import { AuthService } from "@/server/applications/services/auth.service";

// eslint-disable-next-line
export type UseCaseParams<T extends { invoke: (...args: any) => any }> =
  Parameters<T["invoke"]>[0];

// eslint-disable-next-line
export type UseCaseReturn<T extends { invoke: (...args: any) => any }> =
  ReturnType<T["invoke"]>;

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();

const sessionService = new SessionService();

export const pageAuth = new AuthService(playerRepo, staffRepo, sessionService);
