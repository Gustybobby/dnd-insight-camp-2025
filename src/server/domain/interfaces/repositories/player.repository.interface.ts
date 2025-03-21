import type { PlayerItemWithInfo } from "@/server/domain/aggregates";
import type {
  Player,
  PlayerCreate,
  PlayerStat,
  User,
} from "@/server/domain/models";

export interface IPlayerRepository {
  getAll(): Promise<Player[]>;

  getByIdOrThrow({ playerId }: { playerId: Player["id"] }): Promise<Player>;

  getByUserId({ userId }: { userId: User["id"] }): Promise<Player | null>;

  getAllStats({ playerId }: { playerId: Player["id"] }): Promise<PlayerStat[]>;

  getAllItems({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<PlayerItemWithInfo[]>;

  create({ data }: { data: PlayerCreate }): Promise<Player>;

  createStat({
    playerId,
    type,
  }: {
    playerId: Player["id"];
    type: PlayerStat["type"];
  }): Promise<PlayerStat>;
}
