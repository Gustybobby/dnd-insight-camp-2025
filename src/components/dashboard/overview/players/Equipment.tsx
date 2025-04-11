"use client";

import type { IDeletePlayerEquipmentUseCase } from "@/server/applications/interfaces/usecases/player/equipment";
import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";
import type { UseCaseParams } from "@/server/controllers/utils";

import React, { useState } from "react";

import Image from "next/image";

interface EquipmentCellProp {
  equipment: PlayerEquipmentWithInfo;
  handleOnDeleteEquipment: (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId, itemId }: UseCaseParams<IDeletePlayerEquipmentUseCase>,
  ) => Promise<void>;
}

export default function EquipmentCell({
  equipment,
  handleOnDeleteEquipment,
}: EquipmentCellProp) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClickDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setIsLoading(true);
    await handleOnDeleteEquipment(event, {
      playerId: equipment.playerId,
      itemId: equipment.itemId,
    });
    setIsLoading(false);
  };

  return (
    <div
      className="flex w-full items-center space-x-4 rounded-lg border border-black bg-white px-4"
      key={equipment.itemId}
    >
      <Image
        src={equipment.item.image}
        alt="Item image"
        width={30}
        height={30}
      />
      <div className="w-full text-wrap">
        {equipment.item.name} ({equipment.part})
      </div>
      <div className="flex gap-3">
        <button
          className="rounded-lg bg-gray-400 p-1 px-2 text-sm hover:bg-gray-500"
          disabled={isLoading}
          onClick={(event) => handleOnClickDelete(event)}
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
