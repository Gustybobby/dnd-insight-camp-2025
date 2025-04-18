import type { GlobalType } from "@/server/domain/models";

export interface ISetGlobalPhaseUseCase {
  invoke({ phase }: { phase: GlobalType["phase"] }): Promise<GlobalType>;
}
