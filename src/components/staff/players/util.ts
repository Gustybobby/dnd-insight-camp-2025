import type { ModEffectCreate } from "@/server/domain/models";
import type {
  OnSubmitItemInput,
  OnSubmitSkillInput,
} from "./PlayerCharacterStaff";

import { createModEffect } from "@/server/controllers/effect.controller";
import {
  addPlayerItem,
  getAllItems,
} from "@/server/controllers/items.controller";
import { getPlayerStats } from "@/server/controllers/player.controller";
import {
  addPlayerSkill,
  getAllSkills,
} from "@/server/controllers/skill.controller";

import { useMutation, useQuery } from "@tanstack/react-query";

export function useStaffQuery({ playerId }: { playerId: number }) {
  const { data: playerStats, refetch: refetchPlayerStats } = useQuery({
    queryKey: ["getPlayerStats", playerId],
    queryFn: async () => await getPlayerStats({ playerId }),
    refetchInterval: 5000,
  });

  const statMutation = useMutation({
    mutationFn: (modEffectCreate: ModEffectCreate) =>
      createModEffect({ data: { ...modEffectCreate }, playerIds: [+playerId] }),
    onSuccess: () => {
      alert("Stat changed successfully!");
    },
  });

  //Items
  const itemMutation = useMutation({
    mutationFn: ({ itemId, amount }: OnSubmitItemInput) =>
      addPlayerItem({
        data: { itemId: itemId, playerId: playerId, amount: amount },
      }),
    onSuccess: () => {
      // Refetch the items or update the state to reflect the new item
      alert("Item given successfully!");
    },
  });

  const { data: items } = useQuery({
    queryKey: ["getAllItems"],
    queryFn: async () => await getAllItems(),
    refetchInterval: 10000,
  });
  const onItemSubmit = async ({ itemId, amount }: OnSubmitItemInput) => {
    console.log(itemId, amount);
    itemMutation.mutate({ itemId, amount });
  };

  //Skills
  const { data: skills } = useQuery({
    queryKey: ["getAllSkills"],
    queryFn: async () => await getAllSkills(),
    refetchInterval: 10000,
  });

  const skillMutation = useMutation({
    mutationFn: ({ skillId }: OnSubmitSkillInput) =>
      addPlayerSkill({
        data: {
          playerId: playerId,
          skillId: skillId,
        },
      }),
    onSuccess: () => {
      // Refetch the items or update the state to reflect the new item
      alert("Item given successfully!");
    },
  });

  return {
    playerStats,
    statMutation,
    refetchPlayerStats,
    items,
    onItemSubmit,
    skills,
    skillMutation,
  };
}
