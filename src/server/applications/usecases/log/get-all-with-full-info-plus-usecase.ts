import { IPlayerStatLogRepository } from "@/server/domain/interfaces/repositories";
import { IGetAllPlayerStatLogsFullInfoUseCase } from "../../interfaces/usecases/log";
import { PlayerStatLogFullInfoPlusPlayerCharacter } from "@/server/domain/aggregates";

export class GetAllPlayerStatLogsFullInfoUseCase
  implements IGetAllPlayerStatLogsFullInfoUseCase
{
  constructor(private readonly playerStatLogRepo: IPlayerStatLogRepository) {}

  async invoke(): Promise<PlayerStatLogFullInfoPlusPlayerCharacter[]> {
    return this.playerStatLogRepo.getAllWithFullInfoPlus();
  }
}
