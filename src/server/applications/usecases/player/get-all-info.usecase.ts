import type { IGetAllPlayersInfoUseCase } from "../../interfaces/usecases/player";
import type {
  IEquipmentRepository,
  IPlayerRepository,
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
  ) {}

  async invoke(): Promise<PlayerWithAllInfo[]> {
    const playersWithCharacter = await this.playerRepo.getAllWithCharacter();
    const playerStats = await this.playerStatRepo.getAll();
    const playerEquipments = await this.equipmentRepo.getAll();
    const playerItems = await this.playerItemRepo.getAll();

    return playersWithCharacter.map((player) => {
      const stats = playerStats.filter(
        (element) => element.playerId === player.id,
      );
      const equipments = playerEquipments.filter(
        (element) => element.playerId === player.id,
      );
      const items = playerItems.filter(
        (element) => element.playerId === player.id,
      );

      return {
        ...player,
        stats: stats,
        equipments: equipments,
        playerItems: items,
      };
    });
  }
}

// const playersWithStat = await this.playerRepo.getAllStatsAllPlayers().then((stats)=>
//     stats.reduce<PlayerWithReducedStats[]>((acc,stat)=>{
//         const existing = acc.find((element)=>element.id===stat.playerId);
//         if (existing){
//             existing.stats.push(stat);
//         }
//         else{
//             acc.push({id:stat.playerId, stats:[stat]})
//         }
//         return acc
//     },[])
// )
