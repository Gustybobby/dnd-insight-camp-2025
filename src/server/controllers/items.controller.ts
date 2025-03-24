"use server";

import type { IGetAllItemsUseCase } from "@/server/applications/interfaces/usecases/item";
import type { UseCaseReturn } from "@/server/controllers/utils";

import { ItemRepository } from "@/server/infrastructure/repositories/item.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import { AuthService } from "@/server/applications/services/auth.service";
import { GetAllItemsUseCase } from "@/server/applications/usecases/item";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const itemRepo = new ItemRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

const getAllItemsUseCase = new GetAllItemsUseCase(itemRepo);

export async function getAllItems(): Promise<UseCaseReturn<IGetAllItemsUseCase> | null> {
  await authService.authStaff();

  return getAllItemsUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}
