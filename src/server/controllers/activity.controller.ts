"use server";

import type {
  ICreateActivitySessionUseCase,
  IGetActivitySessionsUseCase,
  IGetAllActivitiesUseCase,
} from "@/server/applications/interfaces/usecases/activity";
import type { UseCaseParams, UseCaseReturn } from "@/server/controllers/utils";

import { AuthService } from "@/server/domain/services/auth.service";
import { ActivityRepository } from "@/server/infrastructure/repositories/activity.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";
import {
  CreateActivitySessionUseCase,
  GetActivitySessionsUseCase,
  GetAllActivitiesUseCase,
} from "@/server/applications/usecases/activity";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const activityRepo = new ActivityRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

const getAllActivitiesUseCase = new GetAllActivitiesUseCase(activityRepo);
const getActivitySessionsUseCase = new GetActivitySessionsUseCase(activityRepo);
const createActivitySessionUseCase = new CreateActivitySessionUseCase(
  activityRepo,
);

export async function getAllActivities(): Promise<
  UseCaseReturn<IGetAllActivitiesUseCase>
> {
  return getAllActivitiesUseCase.invoke();
}

export async function getActivitySessions(
  params: UseCaseParams<IGetActivitySessionsUseCase>,
): Promise<UseCaseReturn<IGetActivitySessionsUseCase>> {
  return getActivitySessionsUseCase.invoke(params);
}

export async function createActivitySession(
  params: UseCaseParams<ICreateActivitySessionUseCase>,
): Promise<UseCaseReturn<ICreateActivitySessionUseCase>> {
  await authService.authStaff();

  return createActivitySessionUseCase.invoke(params);
}
