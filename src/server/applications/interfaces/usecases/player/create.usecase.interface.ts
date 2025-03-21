import type { Player, PlayerCreate } from "@/server/domain/models";

export interface ICreatePlayerUseCase {
  invoke({ data }: { data: PlayerCreate }): Promise<Player>;
}
