"use server";

import type {
  ICreatePlayerUseCase,
  IGetAllPlayersUseCase,
  IGetPlayerStatsUseCase,
  IGetPlayerUseCase,
} from "@/server/applications/interfaces/usecases/player";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import {
  CreatePlayerUseCase,
  GetAllPlayersUseCase,
  GetPlayerStatsUseCase,
  GetPlayerUseCase,
} from "@/server/applications/usecases/player";
import { Player, PlayerCreate } from "@/server/domain/models";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";

const playerRepo = new PlayerRepository();

const getAllPlayersUseCase = new GetAllPlayersUseCase(playerRepo);
const getPlayerUseCase = new GetPlayerUseCase(playerRepo);
const getPlayerStatsUseCase = new GetPlayerStatsUseCase(playerRepo);
const createPlayerUseCase = new CreatePlayerUseCase(playerRepo);

export async function getAllPlayers(): Promise<
  UseCaseReturn<IGetAllPlayersUseCase>
> {
  return getAllPlayersUseCase.invoke();
}

export async function getPlayer({
  playerId,
}: UseCaseParams<IGetPlayerUseCase>): Promise<
  UseCaseReturn<IGetPlayerUseCase>
> {
  return getPlayerUseCase.invoke({ playerId: Player.shape.id.parse(playerId) });
}

export async function getPlayerStats({
  playerId,
}: UseCaseParams<IGetPlayerStatsUseCase>): Promise<
  UseCaseReturn<IGetPlayerStatsUseCase>
> {
  return getPlayerStatsUseCase.invoke({
    playerId: Player.shape.id.parse(playerId),
  });
}

export async function createPlayer({
  data,
}: UseCaseParams<ICreatePlayerUseCase>): Promise<
  UseCaseReturn<ICreatePlayerUseCase>
> {
  return createPlayerUseCase.invoke({
    data: PlayerCreate.parse(data),
  });
}
