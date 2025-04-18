import type { ISetGlobalPhaseUseCase } from "../../interfaces/usecases/global";
import type { IGlobalRepository } from "@/server/domain/interfaces/repositories";
import type { GlobalType } from "@/server/domain/models";

export class SetGlobalPhaseUseCase implements ISetGlobalPhaseUseCase {
  constructor(private readonly globalRepo: IGlobalRepository) {}
  async invoke({ phase }: { phase: GlobalType["phase"] }): Promise<GlobalType> {
    return this.globalRepo.setPhase({ phase });
  }
}
