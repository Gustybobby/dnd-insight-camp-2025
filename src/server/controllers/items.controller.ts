"use server";

import type {
  IAddPlayerItemUseCase,
  IDeletePlayerItemUseCase,
  IGetAllItemsUseCase,
  IAddItemUseCase,
  IDeleteItemUseCase,
} from "@/server/applications/interfaces/usecases/item";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { ItemCreate, PlayerItem } from "@/server/domain/models";
import { AuthService } from "@/server/domain/services/auth.service";
import { ItemRepository } from "@/server/infrastructure/repositories/item.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import {
  AddPlayerItemUseCase,
  GetAllItemsUseCase,
  DeletePlayerItemUseCase,
  AddItemUseCase,
  DeleteItemUseCase,
} from "@/server/applications/usecases/item";
import { it } from "node:test";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const itemRepo = new ItemRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

const getAllItemsUseCase = new GetAllItemsUseCase(itemRepo);
const addPlayerItemUseCase = new AddPlayerItemUseCase(itemRepo);
const deletePlayerItemUseCase = new DeletePlayerItemUseCase(itemRepo);
const addItemUseCase = new AddItemUseCase(itemRepo);
const deleteItemUseCase = new DeleteItemUseCase(itemRepo);

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

export async function addItem(
  params: UseCaseParams<IAddItemUseCase>,
): Promise<UseCaseReturn<IAddItemUseCase> | null> {
  await authService.authStaff();

  return addItemUseCase
    .invoke({ data: ItemCreate.parse(params.data) })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export async function deleteItem({
  itemId,
}: UseCaseParams<IDeleteItemUseCase>): Promise<UseCaseReturn<IDeleteItemUseCase> | null> {
  await authService.authStaff();

  return deleteItemUseCase.invoke({ itemId }).catch((error) => {
    console.error(error);
    return null;
  });
}
