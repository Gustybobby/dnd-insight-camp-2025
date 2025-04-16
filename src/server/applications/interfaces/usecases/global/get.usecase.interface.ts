import type { Global } from "@/server/domain/models";

export interface IGetGlobalUseCase {
  invoke(): Promise<Global>;
}
