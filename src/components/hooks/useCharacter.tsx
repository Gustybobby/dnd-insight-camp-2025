"use client";

import type { Player, PlayerStat } from "@/server/domain/models";
import type { Popper, PopupData } from "@/components/hooks/usePopupEffect";

import {
  playerEquipEquipment,
  playerRemoveEquipment,
} from "@/server/controllers/equipment.controller";
import { getPlayerAllInfo } from "@/server/controllers/player.controller";
import { playerUseSkill } from "@/server/controllers/skill.controller";

import { useMutation, useQuery } from "@tanstack/react-query";

import { STAT_STYLE_MAP } from "@/components/players/style";

export function useCharacter({
  playerId,
  refetchInterval,
  popper,
}: {
  playerId: Player["id"];
  refetchInterval: number;
  popper: Popper;
}) {
  function getBoundingRect() {
    return window.document
      .getElementById("character_model")
      ?.getBoundingClientRect();
  }

  const { data: playerAllInfo, refetch } = useQuery({
    queryKey: ["getPlayerAllInfo", playerId],
    queryFn: async () => {
      const allInfo = await getPlayerAllInfo({ playerId });
      const newPlayerStats = allInfo?.stats;
      const rect = getBoundingRect();
      if (rect && playerAllInfo?.stats) {
        newPlayerStats?.forEach((_, idx) => {
          const data = statChangePopup({
            idx,
            currStats: newPlayerStats,
            prevStats: playerAllInfo?.stats,
            rect,
          });
          if (data) {
            setTimeout(() => popper(data), 400);
          }
        });
      }
      return allInfo;
    },
    refetchInterval,
  });

  const equipMutation = useMutation({ mutationFn: playerEquipEquipment });
  const removeMutation = useMutation({ mutationFn: playerRemoveEquipment });

  const useSkillMutation = useMutation({ mutationFn: playerUseSkill });

  return {
    playerAllInfo,
    refetch,
    equipMutation,
    removeMutation,
    useSkillMutation,
  };
}

function statChangePopup({
  idx,
  currStats,
  prevStats,
  rect,
}: {
  idx: number;
  currStats: PlayerStat[];
  prevStats: PlayerStat[];
  rect: DOMRect;
}): Omit<PopupData, "id"> | null {
  const stat = currStats[idx];
  const change = stat.value - prevStats[idx].value;
  if (change === 0) {
    return null;
  }
  return {
    duration: 1000,
    text: `${stat.type} ${change > 0 ? "+" : "-"}${stat.value - prevStats[idx].value}`,
    x: rect.x + (idx % 2) * rect.width - 50 * (1 - (idx % 2)) + 5 * (idx % 2),
    y:
      rect.y + ((idx % currStats.length) / currStats.length) * rect.height - 20,
    className: STAT_STYLE_MAP[stat.type].textColor,
  };
}
