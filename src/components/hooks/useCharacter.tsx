"use client";

import type { Player, PlayerStat } from "@/server/domain/models";
import type { Popper, PopupData } from "@/components/hooks/usePopupEffect";

import {
  getPlayerEquipments,
  playerEquipEquipment,
  playerRemoveEquipment,
} from "@/server/controllers/equipment.controller";
import {
  getPlayerCharacter,
  getPlayerItems,
  getPlayerStats,
} from "@/server/controllers/player.controller";

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

  const { data: character } = useQuery({
    queryKey: ["getPlayerCharacter", playerId],
    queryFn: async () => await getPlayerCharacter({ playerId }),
  });

  const { data: playerStats, refetch: refetchStats } = useQuery({
    queryKey: ["getPlayerStats", playerId],
    queryFn: async () => {
      const newPlayerStats = await getPlayerStats({ playerId });
      const rect = getBoundingRect();
      if (rect && playerStats) {
        newPlayerStats?.forEach((_, idx) => {
          const data = statChangePopup({
            idx,
            currStats: newPlayerStats,
            prevStats: playerStats,
            rect,
          });
          if (data) {
            setTimeout(() => popper(data), 400);
          }
        });
      }
      return newPlayerStats;
    },
    refetchInterval,
  });

  const { data: playerItems, refetch: refetchItems } = useQuery({
    queryKey: ["getPlayerItems", playerId],
    queryFn: async () => await getPlayerItems({ playerId }),
    refetchInterval,
  });

  const { data: playerEquipments, refetch: refetchEquipments } = useQuery({
    queryKey: ["getPlayerEquipments", playerId],
    queryFn: async () => await getPlayerEquipments({ playerId }),
    refetchInterval,
  });

  const equipMutation = useMutation({ mutationFn: playerEquipEquipment });
  const removeMutation = useMutation({ mutationFn: playerRemoveEquipment });

  return {
    character,
    playerStats,
    playerItems,
    playerEquipments,
    refetchStats,
    refetchItems,
    refetchEquipments,
    equipMutation,
    removeMutation,
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
