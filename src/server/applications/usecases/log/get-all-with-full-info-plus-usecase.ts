import type { IGetAllPlayerStatLogsFullInfoUseCase } from "../../interfaces/usecases/log";
import type { IPlayerStatLogRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerStatLogFullInfoPlusPlayerCharacter } from "@/server/domain/aggregates";

export class GetAllPlayerStatLogsFullInfoUseCase
  implements IGetAllPlayerStatLogsFullInfoUseCase
{
  constructor(private readonly playerStatLogRepo: IPlayerStatLogRepository) {}

  async invoke(): Promise<PlayerStatLogFullInfoPlusPlayerCharacter[]> {
    return this.playerStatLogRepo.getAllWithFullInfoPlus().then((logs) =>
      logs.map((log) => ({
        ...log,
        message: log.staffId
          ? "Mod by staff"
          : log.item
            ? "Mod by item"
            : undefined,
      })),
    );
  }
}
