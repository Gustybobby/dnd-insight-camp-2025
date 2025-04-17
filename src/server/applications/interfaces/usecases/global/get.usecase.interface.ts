import type { GlobalType } from "@/server/domain/models";

export interface IGetGlobalUseCase {
  invoke(): Promise<GlobalType>;
}
