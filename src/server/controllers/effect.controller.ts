"use server";

import type { ICreateModEffectUseCase } from "@/server/applications/interfaces/usecases/effect";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { AuthService } from "@/server/applications/services/auth.service";
import { EffectService } from "@/server/applications/services/effect.service";
import { CreateModEffectUseCase } from "@/server/applications/usecases/effect";
import { ModEffectCreate, Player } from "@/server/domain/models";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);
const effectService = new EffectService(playerRepo);

const createModEffectUseCase = new CreateModEffectUseCase(effectService);

export async function createModEffect({
  data,
  playerIds,
}: Omit<
  UseCaseParams<ICreateModEffectUseCase>,
  "staffId"
>): Promise<UseCaseReturn<ICreateModEffectUseCase> | null> {
  const session = await authService.authStaff();

  return createModEffectUseCase
    .invoke({
      data: ModEffectCreate.parse(data),
      playerIds: Player.shape.id.array().parse(playerIds),
      staffId: session.user.staffId,
    })
    .catch(() => null);
}
