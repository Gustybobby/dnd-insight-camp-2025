"use server";

import type {
  IAddPlayerSkillUseCase,
  IGetAllPlayerSkillsUseCase,
  IPlayerUseSkillUseCase,
  IRemoveAllPlayerSkillsUseCase,
  IRemovePlayerSkillUseCase,
} from "@/server/applications/interfaces/usecases/player/skill";
import type { IGetAllSkillsUseCase } from "@/server/applications/interfaces/usecases/skill";
import type { UseCaseParams, UseCaseReturn } from "./utils";

import { AuthService } from "@/server/domain/services/auth.service";
import { ActivityRepository } from "@/server/infrastructure/repositories/activity.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { PlayerSkillRepository } from "@/server/infrastructure/repositories/player-skill.repository";
import { SkillRepository } from "@/server/infrastructure/repositories/skill.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";

import { GetAllPlayerSkillsUseCase } from "../applications/usecases/player/skill";
import { AddPlayerSkillUseCase } from "../applications/usecases/player/skill";
import { RemovePlayerSkillUseCase } from "../applications/usecases/player/skill";
import { RemoveAllPlayerSkillsUseCase } from "../applications/usecases/player/skill";
import { PlayerUseSkillUseCase } from "../applications/usecases/player/skill";
import { GetAllSkillsUseCase } from "../applications/usecases/skill";
import { PlayerSkillCreate } from "../domain/models";

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();
const skillRepo = new SkillRepository();
const playerSkillRepo = new PlayerSkillRepository();
const activityRepo = new ActivityRepository();

const sessionService = new SessionService();

const authService = new AuthService(playerRepo, staffRepo, sessionService);

export async function getAllSkills(): Promise<UseCaseReturn<IGetAllSkillsUseCase> | null> {
  const getAllSkillUseCase = new GetAllSkillsUseCase(skillRepo);
  return getAllSkillUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}

export async function getAllPlayerSkills({
  playerId,
}: UseCaseParams<IGetAllPlayerSkillsUseCase>): Promise<UseCaseReturn<IGetAllPlayerSkillsUseCase> | null> {
  const getAllSkillUseCase = new GetAllPlayerSkillsUseCase(playerSkillRepo);
  return getAllSkillUseCase.invoke({ playerId }).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function addPlayerSkill(
  params: UseCaseParams<IAddPlayerSkillUseCase>,
): Promise<UseCaseReturn<IAddPlayerSkillUseCase> | null> {
  const addPlayerSkillUseCase = new AddPlayerSkillUseCase(playerSkillRepo);
  return addPlayerSkillUseCase
    .invoke({ data: PlayerSkillCreate.parse(params.data) })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export async function removePlayerSkill({
  playerId,
  skillId,
}: UseCaseParams<IRemovePlayerSkillUseCase>): Promise<UseCaseReturn<IRemovePlayerSkillUseCase> | null> {
  const removePlayerSkillUseCase = new RemovePlayerSkillUseCase(
    playerSkillRepo,
  );
  return removePlayerSkillUseCase
    .invoke({ playerId, skillId })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export async function removeAllPlayerSkills({
  playerId,
}: UseCaseParams<IRemoveAllPlayerSkillsUseCase>): Promise<UseCaseReturn<IRemoveAllPlayerSkillsUseCase> | null> {
  await authService.authStaff();

  const removeAllPlayerSkillsUseCase = new RemoveAllPlayerSkillsUseCase(
    playerSkillRepo,
  );
  return removeAllPlayerSkillsUseCase.invoke({ playerId }).catch((error) => {
    console.error(error);
    return null;
  });
}

export async function playerUseSkill({
  playerId,
  skillId,
}: UseCaseParams<IPlayerUseSkillUseCase>): Promise<UseCaseReturn<IPlayerUseSkillUseCase> | null> {
  await authService.authSessionPlayer({ playerId });

  const playerUseSkillUseCase = new PlayerUseSkillUseCase(
    playerSkillRepo,
    skillRepo,
    activityRepo,
  );
  return playerUseSkillUseCase.invoke({ playerId, skillId }).catch((error) => {
    console.error(error);
    return null;
  });
  //If return null => skill is on cooldown or no remaining uses.
}
