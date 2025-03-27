"use server";

import type {
  ICreatePlayerUseCase,
  IGetAllPlayersInfoUseCase,
  IGetAllPlayersUseCase,
  IGetPlayerCharacterUseCase,
  IGetPlayerItemsUseCase,
  IGetPlayerStatsUseCase,
  IGetPlayerUseCase,
  IResetPlayerDataUseCase,
} from "@/server/applications/interfaces/usecases/player";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { Player, PlayerCreate } from "@/server/domain/models";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import { AuthService } from "@/server/applications/services/auth.service";
import {
  CreatePlayerUseCase,
  GetAllPlayersUseCase,
  GetPlayerCharacterUseCase,
  GetPlayerItemsUseCase,
  GetPlayerStatsUseCase,
  GetPlayerUseCase,
} from "@/server/applications/usecases/player";

import { GetAllPlayersInfoUseCase } from "../applications/usecases/player/get-all-info.usecase";
import { EquipmentRepository } from "../infrastructure/repositories/equipment.repository";
import { PlayerItemRepository } from "../infrastructure/repositories/player-item.repository";
import { PlayerStatRepository } from "../infrastructure/repositories/player-stat.repository";
import { ResetPlayerDataUseCase } from "../applications/usecases/player/reset.usecase";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const playerStatRepo = new PlayerStatRepository();
const equipmentRepo = new EquipmentRepository();
const playerItemRepo = new PlayerItemRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

const getAllPlayersUseCase = new GetAllPlayersUseCase(playerRepo);
const getPlayerUseCase = new GetPlayerUseCase(playerRepo);
const getPlayerCharacterUseCase = new GetPlayerCharacterUseCase(playerRepo);
const getPlayerStatsUseCase = new GetPlayerStatsUseCase(playerRepo);
const getPlayerItemsUseCase = new GetPlayerItemsUseCase(playerRepo);
const createPlayerUseCase = new CreatePlayerUseCase(playerRepo);
const getAllPlayersInfoUseCase = new GetAllPlayersInfoUseCase(
  playerRepo,
  playerStatRepo,
  equipmentRepo,
  playerItemRepo,
);
const resetPlayerDataUseCase = new ResetPlayerDataUseCase(playerRepo);

export async function getAllPlayers(): Promise<UseCaseReturn<IGetAllPlayersUseCase> | null> {
  return getAllPlayersUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}

export async function getPlayer({
  playerId,
}: UseCaseParams<IGetPlayerUseCase>): Promise<UseCaseReturn<IGetPlayerUseCase> | null> {
  return getPlayerUseCase
    .invoke({ playerId: Player.shape.id.parse(playerId) })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export async function getPlayerCharacter({
  playerId,
}: UseCaseParams<IGetPlayerCharacterUseCase>): Promise<UseCaseReturn<IGetPlayerCharacterUseCase> | null> {
  return getPlayerCharacterUseCase.invoke({ playerId }).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function getPlayerStats({
  playerId,
}: UseCaseParams<IGetPlayerStatsUseCase>): Promise<UseCaseReturn<IGetPlayerStatsUseCase> | null> {
  return getPlayerStatsUseCase
    .invoke({ playerId: Player.shape.id.parse(playerId) })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export async function getPlayerItems({
  playerId,
}: UseCaseParams<IGetPlayerItemsUseCase>): Promise<UseCaseReturn<IGetPlayerItemsUseCase> | null> {
  return getPlayerItemsUseCase.invoke({ playerId }).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function createPlayer({
  data,
}: UseCaseParams<ICreatePlayerUseCase>): Promise<UseCaseReturn<ICreatePlayerUseCase> | null> {
  await authService.authStaff();

  return createPlayerUseCase
    .invoke({ data: PlayerCreate.parse(data) })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export async function getAllPlayersInfo(): Promise<UseCaseReturn<IGetAllPlayersInfoUseCase> | null> {
  await authService.authStaff();

  return getAllPlayersInfoUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}

export async function resetPlayerData({
  playerId,
}: UseCaseParams<IResetPlayerDataUseCase>): Promise<UseCaseReturn<IResetPlayerDataUseCase> | null> {
  await authService.authStaff();
  return resetPlayerDataUseCase.invoke({ playerId });
}
