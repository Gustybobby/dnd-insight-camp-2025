"use server";

import type { IGetPlayerStatLogsUseCase } from "@/server/applications/interfaces/usecases/log";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { AuthService } from "@/server/domain/services/auth.service";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { PlayerStatLogRepository } from "@/server/infrastructure/repositories/player-stat-log.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import { GetPlayerStatLogsUseCase } from "@/server/applications/usecases/log";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const playerStatLogRepo = new PlayerStatLogRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

const getPlayerStatLogsUseCase = new GetPlayerStatLogsUseCase(
  playerStatLogRepo,
);

export async function getPlayerStatLogs(
  params: UseCaseParams<IGetPlayerStatLogsUseCase>,
): Promise<UseCaseReturn<IGetPlayerStatLogsUseCase> | null> {
  await authService.authStaff();

  return getPlayerStatLogsUseCase.invoke(params).catch((error) => {
    console.error(error);
    return null;
  });
}
