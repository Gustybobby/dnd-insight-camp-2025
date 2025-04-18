"use server";

import type {
  IGetGlobalUseCase,
  ISetGlobalPhaseUseCase,
} from "@/server/applications/interfaces/usecases/global";
import type { UseCaseParams, UseCaseReturn } from "./utils";

import { GlobalRepository } from "@/server/infrastructure/repositories/global.repository";
import {
  GetGlobalUseCase,
  SetGlobalPhaseUseCase,
} from "@/server/applications/usecases/global";

const globalRepo = new GlobalRepository();

export async function getGlobal(): Promise<UseCaseReturn<IGetGlobalUseCase> | null> {
  const getGlobalUseCase = new GetGlobalUseCase(globalRepo);
  return getGlobalUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}

export async function setGlobalPhase({
  phase,
}: UseCaseParams<ISetGlobalPhaseUseCase>): Promise<UseCaseReturn<ISetGlobalPhaseUseCase> | null> {
  const setGlobalPhaseUseCase = new SetGlobalPhaseUseCase(globalRepo);
  return setGlobalPhaseUseCase.invoke({ phase }).catch((error) => {
    console.error(error);
    return null;
  });
}
