import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";

import React from "react";

import Image from "next/image";
import { UseCaseParams } from "@/server/controllers/utils";
import {
  IDeletePlayerEquipmentUseCase,
  IRemoveEquipmentUseCase,
} from "@/server/applications/interfaces/usecases/player/equipment";

interface EquipmentCellProp {
  equipment: PlayerEquipmentWithInfo;
  handleOnUnequipEquipment: (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId, itemId }: UseCaseParams<IRemoveEquipmentUseCase>,
  ) => void;
  handleOnDeleteEquipment: (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId, itemId }: UseCaseParams<IDeletePlayerEquipmentUseCase>,
  ) => void;
}

export default function EquipmentCell({
  equipment,
  handleOnUnequipEquipment,
  handleOnDeleteEquipment,
}: EquipmentCellProp) {
  return (
    <div
      className="flex w-full items-center space-x-4 px-4"
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
      <div className="flex gap-3 pr-12">
        {/* Unequip */}
        <button
          className="size-8 rounded-full bg-gray-400"
          onClick={(event) =>
            handleOnUnequipEquipment(event, {
              playerId: equipment.playerId,
              itemId: equipment.itemId,
            })
          }
        ></button>

        <button
          className="size-8 rounded-full bg-gray-400"
          onClick={(event) =>
            handleOnDeleteEquipment(event, {
              playerId: equipment.playerId,
              itemId: equipment.itemId,
            })
          }
        ></button>
      </div>
    </div>
  );
}
