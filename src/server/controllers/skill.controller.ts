"use server";

import {
  IGetAllPlayerSkillsUseCase,
  IAddPlayerSkillUseCase,
  IRemoveAllPlayerSkillsUseCase,
  IRemovePlayerSkillUseCase,
  IPlayerUseSkillUseCase,
} from "@/server/applications/interfaces/usecases/player/skill";
import { IGetAllSkillsUseCase } from "@/server/applications/interfaces/usecases/skill";
import { UseCaseParams, UseCaseReturn } from "./utils";

import { AuthService } from "@/server/domain/services/auth.service";
import { SkillRepository } from "@/server/infrastructure/repositories/skill.repository";
import { PlayerSkillRepository } from "@/server/infrastructure/repositories/player-skill.repository";
import { StaffRepository } from "@/server/infrastructure/repositories/staff.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { SessionService } from "@/server/infrastructure/services/session.service";

import { GetAllSkillsUseCase } from "../applications/usecases/skill";
import { GetAllPlayerSkillsUseCase } from "../applications/usecases/player/skill";
import { AddPlayerSkillUseCase } from "../applications/usecases/player/skill";
import { RemovePlayerSkillUseCase } from "../applications/usecases/player/skill";
import { RemoveAllPlayerSkillsUseCase } from "../applications/usecases/player/skill";
import { PlayerUseSkillUseCase } from "../applications/usecases/player/skill";

const skillRepo = new SkillRepository();
const playerSkillRepo = new PlayerSkillRepository();
const sessionService = new SessionService();

const playerRepo = new PlayerRepository();
const staffRepo = new StaffRepository();

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

export async function addPlayerSkill({
  data,
}: UseCaseParams<IAddPlayerSkillUseCase>): Promise<UseCaseReturn<IAddPlayerSkillUseCase> | null> {
  const addPlayerSkillUseCase = new AddPlayerSkillUseCase(playerSkillRepo);
  return addPlayerSkillUseCase.invoke({ data }).catch((error) => {
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
  const playerUseSkillUseCase = new PlayerUseSkillUseCase(playerSkillRepo);
  return playerUseSkillUseCase.invoke({ playerId, skillId }).catch((error) => {
    console.error(error);
    return null;
  });
}
