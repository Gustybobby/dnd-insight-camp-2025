import type { PlayerStatLogFullInfoPlusPlayerCharacter } from "@/server/domain/aggregates";

export interface IGetAllPlayerStatLogsFullInfoUseCase {
  invoke(): Promise<PlayerStatLogFullInfoPlusPlayerCharacter[]>;
}
