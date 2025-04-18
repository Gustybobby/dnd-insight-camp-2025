import type {
  IGetAllPlayersInfoUseCase,
  IGetAllPlayersUseCase,
} from "@/server/applications/interfaces/usecases/player";
import type { UseCaseReturn } from "@/server/controllers/utils";

import { AuthService } from "@/server/domain/services/auth.service";
import { EquipmentRepository } from "@/server/infrastructure/repositories/equipment.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { PlayerItemRepository } from "@/server/infrastructure/repositories/player-item.repository";
import { PlayerSkillRepository } from "@/server/infrastructure/repositories/player-skill.repository";
import { PlayerStatRepository } from "@/server/infrastructure/repositories/player-stat.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import {
  GetAllPlayersInfoUseCase,
  GetAllPlayersUseCase,
} from "@/server/applications/usecases/player";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const playerStatRepo = new PlayerStatRepository();
const equipmentRepo = new EquipmentRepository();
const playerItemRepo = new PlayerItemRepository();
const playerSkillRepo = new PlayerSkillRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

export async function getAllPlayers(): Promise<UseCaseReturn<IGetAllPlayersUseCase> | null> {
  const getAllPlayersUseCase = new GetAllPlayersUseCase(playerRepo);
  return getAllPlayersUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}

export async function getAllPlayersInfo(): Promise<UseCaseReturn<IGetAllPlayersInfoUseCase> | null> {
  await authService.authStaff();

  const getAllPlayersInfoUseCase = new GetAllPlayersInfoUseCase(
    playerRepo,
    playerStatRepo,
    equipmentRepo,
    playerItemRepo,
    playerSkillRepo,
  );
  return getAllPlayersInfoUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}
