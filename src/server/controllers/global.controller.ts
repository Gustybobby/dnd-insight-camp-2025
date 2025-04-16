"use server";

import { IGetGlobalUseCase } from "@/server/applications/interfaces/usecases/global";
import { GetGlobalUseCase } from "@/server/applications/usecases/global";

import { UseCaseParams, UseCaseReturn } from "./utils";

import { GlobalRepository } from "@/server/infrastructure/repositories/global.repository";

const globalRepo = new GlobalRepository();

export async function getGlobal(): Promise<UseCaseReturn<IGetGlobalUseCase> | null> {
  const getGlobalUseCase = new GetGlobalUseCase(globalRepo);
  return getGlobalUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}
