"use server";

import type {
  IEquipEquipmentUseCase,
  IGetAllPlayerEquipmentsUseCase,
  IRemoveEquipmentUseCase,
} from "@/server/applications/interfaces/usecases/player/equipment";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { EquipmentRepository } from "@/server/infrastructure/repositories/equipment.repository";
import { ItemRepository } from "@/server/infrastructure/repositories/item.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import { AuthService } from "@/server/applications/services/auth.service";
import { EffectService } from "@/server/applications/services/effect.service";
import { EquipmentService } from "@/server/applications/services/equipments";
import { ItemService } from "@/server/applications/services/item.service";
import {
  EquipEquipmentUseCase,
  GetAllPlayerEquipmentsUseCase,
  RemoveEquipmentUseCase,
} from "@/server/applications/usecases/player/equipment";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const equipmentRepo = new EquipmentRepository();
const itemRepo = new ItemRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);
const itemService = new ItemService();
const effectService = new EffectService(playerRepo);
const equipmentService = new EquipmentService(
  equipmentRepo,
  itemRepo,
  itemService,
  effectService,
);

const getAllPlayerEquipmentsUseCase = new GetAllPlayerEquipmentsUseCase(
  equipmentRepo,
);

export async function getPlayerEquipments(
  params: UseCaseParams<IGetAllPlayerEquipmentsUseCase>,
): Promise<UseCaseReturn<IGetAllPlayerEquipmentsUseCase> | null> {
  return getAllPlayerEquipmentsUseCase.invoke(params).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function playerEquipEquipment(
  params: UseCaseParams<IEquipEquipmentUseCase>,
): Promise<UseCaseReturn<IEquipEquipmentUseCase> | null> {
  await authService.authPlayer();

  const equipEquipmentUseCase = new EquipEquipmentUseCase(
    await equipmentService.use({ itemId: params.itemId }),
  );
  return equipEquipmentUseCase.invoke(params).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function playerRemoveEquipment(
  params: UseCaseParams<IRemoveEquipmentUseCase>,
): Promise<UseCaseReturn<IRemoveEquipmentUseCase> | null> {
  await authService.authPlayer();

  const removeEquipmentUseCase = new RemoveEquipmentUseCase(
    await equipmentService.use({ itemId: params.itemId }),
  );
  return removeEquipmentUseCase.invoke(params).catch((error) => {
    console.error(error);
    return null;
  });
}
