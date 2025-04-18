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
  IUpdatePlayerUseCase,
} from "@/server/applications/interfaces/usecases/player";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { Player, PlayerCreate } from "@/server/domain/models";
import { AuthService } from "@/server/domain/services/auth.service";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import {
  CreatePlayerUseCase,
  GetAllPlayersUseCase,
  GetPlayerCharacterUseCase,
  GetPlayerItemsUseCase,
  GetPlayerStatsUseCase,
  GetPlayerUseCase,
  UpdatePlayerUseCase,
} from "@/server/applications/usecases/player";

import { GetAllPlayersInfoUseCase } from "../applications/usecases/player";
import { ResetPlayerDataUseCase } from "../applications/usecases/player";
import { EquipmentRepository } from "../infrastructure/repositories/equipment.repository";
import { PlayerItemRepository } from "../infrastructure/repositories/player-item.repository";
import { PlayerStatRepository } from "../infrastructure/repositories/player-stat.repository";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const playerStatRepo = new PlayerStatRepository();
const equipmentRepo = new EquipmentRepository();
const playerItemRepo = new PlayerItemRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

export async function getAllPlayers(): Promise<UseCaseReturn<IGetAllPlayersUseCase> | null> {
  const getAllPlayersUseCase = new GetAllPlayersUseCase(playerRepo);
  return getAllPlayersUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}

export async function getPlayer({
  playerId,
}: UseCaseParams<IGetPlayerUseCase>): Promise<UseCaseReturn<IGetPlayerUseCase> | null> {
  const getPlayerUseCase = new GetPlayerUseCase(playerRepo);
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
  const getPlayerCharacterUseCase = new GetPlayerCharacterUseCase(playerRepo);
  return getPlayerCharacterUseCase.invoke({ playerId }).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function getPlayerStats({
  playerId,
}: UseCaseParams<IGetPlayerStatsUseCase>): Promise<UseCaseReturn<IGetPlayerStatsUseCase> | null> {
  const getPlayerStatsUseCase = new GetPlayerStatsUseCase(playerRepo);
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
  const getPlayerItemsUseCase = new GetPlayerItemsUseCase(playerRepo);
  return getPlayerItemsUseCase.invoke({ playerId }).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function updatePlayer(
  params: UseCaseParams<IUpdatePlayerUseCase>,
): Promise<UseCaseReturn<IUpdatePlayerUseCase>> {
  await authService.authSessionPlayer({ playerId: params.playerId });

  const updatePlayerUseCase = new UpdatePlayerUseCase(playerRepo);
  return updatePlayerUseCase.invoke(params);
}

export async function createPlayer({
  data,
}: UseCaseParams<ICreatePlayerUseCase>): Promise<UseCaseReturn<ICreatePlayerUseCase> | null> {
  await authService.authStaff();

  const createPlayerUseCase = new CreatePlayerUseCase(playerRepo);
  return createPlayerUseCase
    .invoke({ data: PlayerCreate.parse(data) })
    .catch((error) => {
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
  );
  return getAllPlayersInfoUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}

export async function resetPlayerData({
  playerId,
}: UseCaseParams<IResetPlayerDataUseCase>): Promise<UseCaseReturn<IResetPlayerDataUseCase> | null> {
  await authService.authStaff();

  const resetPlayerDataUseCase = new ResetPlayerDataUseCase(playerRepo);
  return resetPlayerDataUseCase.invoke({ playerId });
}
