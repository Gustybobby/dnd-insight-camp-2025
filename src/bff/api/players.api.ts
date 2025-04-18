"use client";

import type {
  IGetAllPlayersInfoUseCase,
  IGetAllPlayersUseCase,
} from "@/server/applications/interfaces/usecases/player";
import type { UseCaseReturn } from "@/server/controllers/utils";

export async function fetchAllPlayers(): Promise<UseCaseReturn<IGetAllPlayersUseCase> | null> {
  const res = await fetch(`/api/players?action=all`);
  return res.json();
}

export async function fetchAllPlayersInfo(): Promise<UseCaseReturn<IGetAllPlayersInfoUseCase> | null> {
  const res = await fetch(`/api/players?action=allInfo`);
  return res.json();
}
