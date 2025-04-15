import type { IPlayerStatRepository } from "@/server/domain/interfaces/repositories";
import type { PlayerStat } from "@/server/domain/models";

import { db } from "@/db";
import { playerStatsTable } from "@/db/schema";

export class PlayerStatRepository implements IPlayerStatRepository {
  async getAll(): Promise<PlayerStat[]> {
    return db.select().from(playerStatsTable);
  }
}
