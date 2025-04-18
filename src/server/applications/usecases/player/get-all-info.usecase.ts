import type { IGetAllPlayersInfoUseCase } from "../../interfaces/usecases/player";
import type {
  IEquipmentRepository,
  IPlayerRepository,
  IPlayerSkillRepository,
  IPlayerStatRepository,
} from "@/server/domain/interfaces/repositories";
import type { IPlayerItemRepository } from "@/server/domain/interfaces/repositories/player-item.repository.interface";
import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

export class GetAllPlayersInfoUseCase implements IGetAllPlayersInfoUseCase {
  constructor(
    private readonly playerRepo: IPlayerRepository,
    private readonly playerStatRepo: IPlayerStatRepository,
    private readonly equipmentRepo: IEquipmentRepository,
    private readonly playerItemRepo: IPlayerItemRepository,
    private readonly playerSkillRepo: IPlayerSkillRepository,
  ) {}

  async invoke(): Promise<PlayerWithAllInfo[]> {
    const [
      playersWithCharacter,
      playerStats,
      playerEquipments,
      playerItems,
      playerSkills,
    ] = await Promise.all([
      this.playerRepo.getAllWithCharacter(),
      this.playerStatRepo.getAll(),
      this.equipmentRepo.getAll(),
      this.playerItemRepo.getAll(),
      this.playerSkillRepo.getAllPlayers(),
    ]);

    return playersWithCharacter.map((player) => {
      const stats = playerStats.filter((e) => e.playerId === player.id);
      const equipments = playerEquipments.filter(
        (e) => e.playerId === player.id,
      );
      const items = playerItems.filter((e) => e.playerId === player.id);
      const skills = playerSkills.filter((e) => e.playerId === player.id);

      return {
        ...player,
        stats: stats,
        equipments: equipments,
        playerItems: items,
        playerSkills: skills,
      };
    });
  }
}
