import type { GlobalType } from "@/server/domain/models";

export interface IGlobalRepository {
  getAll(): Promise<GlobalType>;
  setPhase({ phase }: { phase: GlobalType["phase"] }): Promise<GlobalType>;
}
