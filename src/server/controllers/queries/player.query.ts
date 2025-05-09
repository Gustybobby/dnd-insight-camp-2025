import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

import { EffectRepository } from "@/server/infrastructure/repositories/effect.repository";
import { EquipmentRepository } from "@/server/infrastructure/repositories/equipment.repository";
import { PlayerRepository } from "@/server/infrastructure/repositories/player.repository";
import { PlayerSkillRepository } from "@/server/infrastructure/repositories/player-skill.repository";
import {
  GetPlayerCharacterUseCase,
  GetPlayerItemsUseCase,
  GetPlayerStatsUseCase,
  GetPlayerUseCase,
  GetPlayerVisualEffectsUseCase,
} from "@/server/applications/usecases/player";
import { GetAllPlayerEquipmentsUseCase } from "@/server/applications/usecases/player/equipment";
import { GetAllPlayerSkillsUseCase } from "@/server/applications/usecases/player/skill";

const effectRepo = new EffectRepository();
const playerRepo = new PlayerRepository();
const equipmentRepo = new EquipmentRepository();
const playerSkillRepo = new PlayerSkillRepository();

export async function getPlayerAllInfo({
  playerId,
}: {
  playerId: PlayerWithAllInfo["id"];
}): Promise<PlayerWithAllInfo | null> {
  const getPlayerUseCase = new GetPlayerUseCase(playerRepo);
  const getPlayerCharacterUseCase = new GetPlayerCharacterUseCase(playerRepo);
  const getPlayerStatsUseCase = new GetPlayerStatsUseCase(playerRepo);
  const getPlayerVisualEffectsUseCase = new GetPlayerVisualEffectsUseCase(
    effectRepo,
  );
  const getPlayerItemsUseCase = new GetPlayerItemsUseCase(playerRepo);
  const getAllPlayerEquipmentsUseCase = new GetAllPlayerEquipmentsUseCase(
    equipmentRepo,
  );
  const getPlayerSkillsUseCase = new GetAllPlayerSkillsUseCase(playerSkillRepo);
  try {
    const [player, character, stats, effects, items, equipments, skills] =
      await Promise.all([
        getPlayerUseCase.invoke({ playerId }),
        getPlayerCharacterUseCase.invoke({ playerId }),
        getPlayerStatsUseCase.invoke({ playerId }),
        getPlayerVisualEffectsUseCase.invoke({ playerId }),
        getPlayerItemsUseCase.invoke({ playerId }),
        getAllPlayerEquipmentsUseCase.invoke({ playerId }),
        getPlayerSkillsUseCase.invoke({ playerId }),
      ]);
    return {
      ...player,
      character,
      stats,
      effects,
      playerItems: items,
      equipments,
      playerSkills: skills,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
