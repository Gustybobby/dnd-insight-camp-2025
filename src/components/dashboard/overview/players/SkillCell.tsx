"use client";

import type { PlayerSkillWithInfo } from "@/server/domain/aggregates";

import React, { useState } from "react";

import Image from "next/image";

interface SkillCellProp {
  playerSkill: PlayerSkillWithInfo;
}

export default function SkillCell({ playerSkill }: SkillCellProp) {
  const [isLoading, setIsLoading] = useState(false);

  // const handleOnClickDelete = async (
  //   event: React.MouseEvent<HTMLButtonElement>,
  // ) => {
  //   setIsLoading(true);
  //   await handleOnDeleteEquipment(event, {
  //     playerId: equipment.playerId,
  //     itemId: equipment.itemId,
  //   });
  //   setIsLoading(false);
  // };

  return (
    <div className="flex w-full items-center space-x-4 rounded-lg border border-black bg-white px-4">
      <Image
        src={playerSkill.skill.image}
        alt="Item image"
        width={30}
        height={30}
      />
      <div className="w-full text-wrap">
        {playerSkill.skill.name} ({playerSkill.cooldown})
      </div>
      <div className="flex gap-3">
        <button
          className="rounded-lg bg-gray-400 p-1 px-2 text-sm hover:bg-gray-500"
          disabled={isLoading}
          onClick={(event) => console.log(event)}
        >
          {isLoading ? (
            <div className="size-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            <p>Delete</p>
          )}
        </button>
      </div>
    </div>
  );
}
