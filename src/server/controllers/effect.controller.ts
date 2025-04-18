"use server";

import type { ICreateModEffectUseCase } from "@/server/applications/interfaces/usecases/effect";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { ModEffectCreate, Player } from "@/server/domain/models";
import { AuthService } from "@/server/domain/services/auth.service";
import { EffectService } from "@/server/domain/services/effect.service";
import { EffectRepository } from "@/server/infrastructure/repositories/effect.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import { CreateModEffectUseCase } from "@/server/applications/usecases/effect";

const effectRepo = new EffectRepository();
const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);
const effectService = new EffectService(effectRepo, playerRepo);

export async function createModEffect({
  data,
  playerIds,
}: Omit<
  UseCaseParams<ICreateModEffectUseCase>,
  "staffId"
>): Promise<UseCaseReturn<ICreateModEffectUseCase> | null> {
  const session = await authService.authStaff();

  const createModEffectUseCase = new CreateModEffectUseCase(effectService);
  return createModEffectUseCase
    .invoke({
      data: ModEffectCreate.parse(data),
      playerIds: Player.shape.id.array().parse(playerIds),
      staffId: session.user.staffId,
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}
