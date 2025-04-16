"use server";

import type { IGetGlobalUseCase } from "@/server/applications/interfaces/usecases/global";
import type { UseCaseReturn } from "./utils";

import { GlobalRepository } from "@/server/infrastructure/repositories/global.repository";
import { GetGlobalUseCase } from "@/server/applications/usecases/global";

const globalRepo = new GlobalRepository();

export async function getGlobal(): Promise<UseCaseReturn<IGetGlobalUseCase> | null> {
  const getGlobalUseCase = new GetGlobalUseCase(globalRepo);
  return getGlobalUseCase.invoke().catch((error) => {
    console.error(error);
    return null;
  });
}
