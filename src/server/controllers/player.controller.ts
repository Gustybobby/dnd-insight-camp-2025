"use server";

import type {
  ICreatePlayerUseCase,
  IGetAllPlayersUseCase,
  IGetPlayerCharacterUseCase,
  IGetPlayerItemsUseCase,
  IGetPlayerStatsUseCase,
  IGetPlayerUseCase,
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
} from "@/server/applications/usecases/player";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

const getAllPlayersUseCase = new GetAllPlayersUseCase(playerRepo);
const getPlayerUseCase = new GetPlayerUseCase(playerRepo);
const getPlayerCharacterUseCase = new GetPlayerCharacterUseCase(playerRepo);
const getPlayerStatsUseCase = new GetPlayerStatsUseCase(playerRepo);
const getPlayerItemsUseCase = new GetPlayerItemsUseCase(playerRepo);
const createPlayerUseCase = new CreatePlayerUseCase(playerRepo);

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
