import type { PlayerItem } from "@/server/domain/models";

export interface IAddPlayerItemUseCase {
  invoke({ data }: { data: PlayerItem }): Promise<PlayerItem>;
}
