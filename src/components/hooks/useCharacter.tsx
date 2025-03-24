"use client";

import type { Player } from "@/server/domain/models";

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

export function useCharacter({
  playerId,
  refetchInterval,
}: {
  playerId: Player["id"];
  refetchInterval: number;
}) {
  const { data: character } = useQuery({
    queryKey: ["getPlayerCharacter", playerId],
    queryFn: async () => await getPlayerCharacter({ playerId }),
  });

  const { data: playerStats, refetch: refetchStats } = useQuery({
    queryKey: ["getPlayerStats", playerId],
    queryFn: async () => await getPlayerStats({ playerId }),
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
