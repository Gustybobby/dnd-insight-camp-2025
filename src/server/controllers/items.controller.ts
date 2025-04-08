"use server";

import type {
  IAddPlayerItemUseCase,
  IDeletePlayerItemUseCase,
  IGetAllItemsUseCase,
} from "@/server/applications/interfaces/usecases/item";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { PlayerItem } from "@/server/domain/models";
import { AuthService } from "@/server/domain/services/auth.service";
import { ItemRepository } from "@/server/infrastructure/repositories/item.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import {
  AddPlayerItemUseCase,
  GetAllItemsUseCase,
} from "@/server/applications/usecases/item";

import { DeletePlayerItemUseCase } from "../applications/usecases/item/delete-player-item.usecase";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const itemRepo = new ItemRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

const getAllItemsUseCase = new GetAllItemsUseCase(itemRepo);
const addPlayerItemUseCase = new AddPlayerItemUseCase(itemRepo);
const deletePlayerItemUseCase = new DeletePlayerItemUseCase(itemRepo);

export async function getAllItems(): Promise<UseCaseReturn<IGetAllItemsUseCase> | null> {
  await authService.authStaff();

  return getAllItemsUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}

export async function addPlayerItem(
  params: UseCaseParams<IAddPlayerItemUseCase>,
): Promise<UseCaseReturn<IAddPlayerItemUseCase> | null> {
  await authService.authStaff();

  return addPlayerItemUseCase
    .invoke({ data: PlayerItem.parse(params.data) })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export async function deletePlayerItem({
  playerId,
  itemId,
}: UseCaseParams<IDeletePlayerItemUseCase>): Promise<UseCaseReturn<IDeletePlayerItemUseCase> | null> {
  await authService.authStaff();

  return deletePlayerItemUseCase.invoke({ playerId, itemId }).catch((error) => {
    console.error(error);
    return null;
  });
}
