"use server";

import type {
  IEquipEquipmentUseCase,
  IRemoveEquipmentUseCase,
} from "@/server/applications/interfaces/usecases/player/equipment";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { AuthService } from "@/server/domain/services/auth.service";
import { EffectService } from "@/server/domain/services/effect.service";
import { EquipmentService } from "@/server/domain/services/equipments";
import { ItemService } from "@/server/domain/services/item.service";
import { EffectRepository } from "@/server/infrastructure/repositories/effect.repository";
import { EquipmentRepository } from "@/server/infrastructure/repositories/equipment.repository";
import { ItemRepository } from "@/server/infrastructure/repositories/item.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import {
  EquipEquipmentUseCase,
  RemoveEquipmentUseCase,
} from "@/server/applications/usecases/player/equipment";

const effectRepo = new EffectRepository();
const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const equipmentRepo = new EquipmentRepository();
const itemRepo = new ItemRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);
const itemService = new ItemService();
const effectService = new EffectService(effectRepo, playerRepo);
const equipmentService = new EquipmentService(
  equipmentRepo,
  itemRepo,
  itemService,
  effectService,
);

export async function playerEquipEquipment(
  params: UseCaseParams<IEquipEquipmentUseCase>,
): Promise<UseCaseReturn<IEquipEquipmentUseCase> | null> {
  await authService.authSessionPlayer({ playerId: params.playerId });

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
  await authService.authSessionPlayer({ playerId: params.playerId });

  const removeEquipmentUseCase = new RemoveEquipmentUseCase(
    await equipmentService.use({ itemId: params.itemId }),
  );
  return removeEquipmentUseCase.invoke(params).catch((error) => {
    console.error(error);
    return null;
  });
}
