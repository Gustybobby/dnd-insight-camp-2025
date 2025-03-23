"use server";

import type {
  ICreatePlayerUseCase,
  IGetAllPlayersUseCase,
  IGetPlayerCharacterUseCase,
  IGetPlayerStatsUseCase,
  IGetPlayerUseCase,
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
  GetPlayerStatsUseCase,
  GetPlayerUseCase,
} from "@/server/applications/usecases/player";
import { GetPlayerCharacterUseCase } from "@/server/applications/usecases/player/get-character.usecase";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

const getAllPlayersUseCase = new GetAllPlayersUseCase(playerRepo);
const getPlayerUseCase = new GetPlayerUseCase(playerRepo);
const getPlayerCharacterUseCase = new GetPlayerCharacterUseCase(playerRepo);
const getPlayerStatsUseCase = new GetPlayerStatsUseCase(playerRepo);
const createPlayerUseCase = new CreatePlayerUseCase(playerRepo);

export async function getAllPlayers(): Promise<UseCaseReturn<IGetAllPlayersUseCase> | null> {
  return getAllPlayersUseCase.invoke().catch(() => null);
}

export async function getPlayer({
  playerId,
}: UseCaseParams<IGetPlayerUseCase>): Promise<UseCaseReturn<IGetPlayerUseCase> | null> {
  return getPlayerUseCase
    .invoke({ playerId: Player.shape.id.parse(playerId) })
    .catch(() => null);
}

export async function getPlayerCharacter({
  playerId,
}: UseCaseParams<IGetPlayerCharacterUseCase>): Promise<UseCaseReturn<IGetPlayerCharacterUseCase> | null> {
  return getPlayerCharacterUseCase.invoke({ playerId }).catch(() => null);
}

export async function getPlayerStats({
  playerId,
}: UseCaseParams<IGetPlayerStatsUseCase>): Promise<UseCaseReturn<IGetPlayerStatsUseCase> | null> {
  return getPlayerStatsUseCase
    .invoke({
      playerId: Player.shape.id.parse(playerId),
    })
    .catch(() => null);
}

export async function createPlayer({
  data,
}: UseCaseParams<ICreatePlayerUseCase>): Promise<UseCaseReturn<ICreatePlayerUseCase> | null> {
  await authService.authStaff();

  return createPlayerUseCase
    .invoke({ data: PlayerCreate.parse(data) })
    .catch(() => null);
}
