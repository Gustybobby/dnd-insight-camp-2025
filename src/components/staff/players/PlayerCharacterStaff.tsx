"use client";

import type { Skill, StatTypeEnum } from "@/server/domain/models";
import type { Item } from "@/server/domain/models";
import type { ModEffectCreate } from "@/server/domain/models/effect.model";

import { ALL_STAT_TYPES } from "@/shared/stat";

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

import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import ItemModal from "./ItemModal";
import SkillModal from "./SkillModal";
import StaffPlayerItem from "./StaffPlayerItems";
import StaffPlayerSkills from "./StaffPlayerSkills";
import { StaffPlayerStats } from "./StaffPlayerStats";
import { PlayerCharacter } from "@/components/players/details/PlayerCharacter";
import { StaffPlayerUtils } from "@/components/staff/players/StaffPlayerUtils";
import Image from "next/image";
import Link from "next/link";

export interface OnSubmitItemInput {
  itemId: number;
  amount: number;
}

export interface OnSubmitSkillInput {
  skillId: number;
  remainingUses: number;
}

export function PlayerCharacterStaff({ playerId }: { playerId: number }) {
  //Stats
  const { data: playerStats, refetch: refetchPlayerStats } = useQuery({
    queryKey: ["getPlayerStats", playerId],
    queryFn: async () => await getPlayerStats({ playerId }),
    refetchInterval: 1000,
  });

  const statMutation = useMutation({
    mutationFn: (modEffectCreate: ModEffectCreate) =>
      createModEffect({ data: { ...modEffectCreate }, playerIds: [+playerId] }),
    onSuccess: () => {
      alert("Stat changed successfully!");
    },
  });

  const onStatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const statChange = Object.fromEntries(
      formData.entries().filter(([, value]) => +value !== 0),
    );
    const mutationPromises = Object.entries(statChange).map(([key, value]) => {
      return statMutation.mutateAsync({
        stat: key as StatTypeEnum,
        value: +value,
        itemId: null,
      });
    });
    Promise.all(mutationPromises)
      .then(() => {
        void refetchPlayerStats();
      })
      .catch((e) => {
        alert(`Error changing stat: ${e}`);
      });
    e.currentTarget.reset();
  };

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
    mutationFn: ({ skillId, remainingUses }: OnSubmitSkillInput) =>
      addPlayerSkill({
        data: {
          playerId: playerId,
          skillId: skillId,
          remainingUses: remainingUses,
        },
      }),
    onSuccess: () => {
      // Refetch the items or update the state to reflect the new item
      alert("Item given successfully!");
    },
  });

  const onSkillSubmit = async ({
    skillId,
    remainingUses,
  }: OnSubmitSkillInput) => {
    console.log({
      playerId: playerId,
      skillId: skillId,
      remainingUses: remainingUses,
    });

    skillMutation.mutate({ skillId, remainingUses });
  };

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const openModal = ({
    label,
    data,
  }: {
    label: string;
    data: Item | Skill;
  }) => {
    if (label === "Item") {
      setItem(data as Item);
    }
    if (label === "Skill") {
      setSkill(data as Skill);
    }
    setModalIsOpen(true);
  };

  const [item, setItem] = React.useState<Item | null>(null);
  const [skill, setSkill] = React.useState<Skill | null>(null);

  return (
    <div className="flex min-w-full flex-col items-center">
      <div className="w-full px-5">
        <div className="grid grid-cols-3 px-4 py-2 text-xl bg-cream rounded-md border-2 border-oldcream">
          <Link href={"/staff"}>
            {" "}
            <Image
              src={"/asset/props/back_arrow.png"}
              alt={"back"}
              width={40}
              height={40}
            />
          </Link>
          <h1 className="font-bold text-black text-3xl self-center text-center">Player</h1>
        </div>
      </div>
      <div className="grid max-h-[100%] w-full grid-cols-2 gap-x-4 overflow-y-auto">
        <PlayerCharacter playerId={playerId} isPlayer={true} className="mt-0" />
        <StaffPlayerUtils
          tabs={[
            {
              label: "Stats",
              node: (
                <StaffPlayerStats
                  playerStats={ALL_STAT_TYPES.map(
                    (type) =>
                      playerStats?.find((stat) => stat.type === type) ?? {
                        type,
                        value: 0,
                        playerId: 0,
                      },
                  )}
                  onSubmit={onStatSubmit}
                />
              ),
              modal: <></>,
            },
            {
              label: "Item",
              node: (
                <StaffPlayerItem
                  items={items ?? null}
                  onClickItem={openModal}
                />
              ),
              modal: (
                <ItemModal
                  item={item ?? null}
                  modalOpen={modalIsOpen}
                  closeModal={() => setModalIsOpen(false)}
                  onSubmit={() =>
                    onItemSubmit({ itemId: item?.id ?? 0, amount: 0 })
                  }
                />
              ),
            },
            {
              label: "Skills",
              node: (
                <StaffPlayerSkills
                  skills={skills ?? null}
                  onClickSkill={openModal}
                />
              ),
              modal: (
                <SkillModal
                  skill={skill ?? null}
                  modalOpen={modalIsOpen}
                  closeModal={() => setModalIsOpen(false)}
                  onSubmit={() =>
                    onSkillSubmit({ skillId: skill?.id ?? 0, remainingUses: 2 })
                  }
                ></SkillModal>
              ),
            },
          ]}
          defaultTab="Stats"
          isModalOpen={modalIsOpen}
          setIsModalOpen={setModalIsOpen}
        />
      </div>
    </div>
  );
}
