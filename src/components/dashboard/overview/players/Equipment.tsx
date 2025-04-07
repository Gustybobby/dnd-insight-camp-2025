import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";

import React from "react";

import Image from "next/image";

interface EquipmentCellProp {
  equipment: PlayerEquipmentWithInfo;
}

export default function EquipmentCell({ equipment }: EquipmentCellProp) {
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
      <div className="flex pr-12">
        <button>Delete</button>
      </div>
    </div>
  );
}
