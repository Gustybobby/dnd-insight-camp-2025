"use server";

import type {
  ICreateActivitySessionUseCase,
  IEndTurnUseCase,
  IGetActiveTurnsUseCase,
  IGetActivitySessionsUseCase,
  IGetActivitySessionUseCase,
  IGetAllActivitiesUseCase,
  IUpsertSessionTurnUseCase,
} from "@/server/applications/interfaces/usecases/activity";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { SessionTurn } from "@/server/domain/models";
import { AuthService } from "@/server/domain/services/auth.service";
import { ActivityRepository } from "@/server/infrastructure/repositories/activity.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { PlayerSkillRepository } from "@/server/infrastructure/repositories/player-skill.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import {
  CreateActivitySessionUseCase,
  GetActiveTurnsUseCase,
  GetActivitySessionsUseCase,
  GetActivitySessionUseCase,
  GetAllActivitiesUseCase,
  UpsertSessionTurnUseCase,
} from "@/server/applications/usecases/activity";
import { EndTurnUseCase } from "@/server/applications/usecases/activity/end-turn.usecase";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const activityRepo = new ActivityRepository();
const playerSkillRepo = new PlayerSkillRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

const getAllActivitiesUseCase = new GetAllActivitiesUseCase(activityRepo);
const getActivitySessionsUseCase = new GetActivitySessionsUseCase(activityRepo);
const getActiveTurnsUseCase = new GetActiveTurnsUseCase(activityRepo);
const getActivitySessionUseCase = new GetActivitySessionUseCase(activityRepo);
const createActivitySessionUseCase = new CreateActivitySessionUseCase(
  activityRepo,
);
const upsertSessionTurnUseCase = new UpsertSessionTurnUseCase(activityRepo);
const endTurnUseCase = new EndTurnUseCase(activityRepo, playerSkillRepo);

export async function getAllActivities(): Promise<UseCaseReturn<IGetAllActivitiesUseCase> | null> {
  return getAllActivitiesUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}

export async function getActivitySessions(
  params: UseCaseParams<IGetActivitySessionsUseCase>,
): Promise<UseCaseReturn<IGetActivitySessionsUseCase> | null> {
  return getActivitySessionsUseCase.invoke(params).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function getActiveTurns(): Promise<UseCaseReturn<IGetActiveTurnsUseCase> | null> {
  return getActiveTurnsUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}

export async function getActivitySession(
  params: UseCaseParams<IGetActivitySessionUseCase>,
): Promise<UseCaseReturn<IGetActivitySessionUseCase> | null> {
  return getActivitySessionUseCase.invoke(params).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function createActivitySession(
  params: UseCaseParams<ICreateActivitySessionUseCase>,
): Promise<UseCaseReturn<ICreateActivitySessionUseCase> | null> {
  await authService.authStaff();

  return createActivitySessionUseCase.invoke(params).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function upsertSessionTurn(
  params: UseCaseParams<IUpsertSessionTurnUseCase>,
): Promise<UseCaseReturn<IUpsertSessionTurnUseCase> | null> {
  await authService.authStaff();

  return upsertSessionTurnUseCase
    .invoke({ data: SessionTurn.omit({ id: true }).parse(params.data) })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export async function endTurn(
  params: UseCaseParams<IEndTurnUseCase>,
): Promise<UseCaseReturn<IEndTurnUseCase> | null> {
  await authService.authSessionPlayer({ playerId: params.playerId });

  return endTurnUseCase.invoke({ ...params, isBoss: false }).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function bossEndTurn(
  params: UseCaseParams<IEndTurnUseCase>,
): Promise<UseCaseReturn<IEndTurnUseCase> | null> {
  await authService.authStaff();

  return endTurnUseCase.invoke({ ...params, isBoss: true }).catch((error) => {
    console.error(error);
    return null;
  });
}
