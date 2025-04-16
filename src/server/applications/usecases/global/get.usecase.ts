import type { IGetGlobalUseCase } from "../../interfaces/usecases/global";
import type { IGlobalRepository } from "@/server/domain/interfaces/repositories";
import type { Global } from "@/server/domain/models";

export class GetGlobalUseCase implements IGetGlobalUseCase {
  constructor(private readonly globalRepo: IGlobalRepository) {}
  async invoke(): Promise<Global> {
    return this.globalRepo.getAll();
  }
}
