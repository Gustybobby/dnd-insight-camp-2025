import { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";
import React from "react";
import Image from "next/image";

interface EquipmentCellProp {
  equipment: PlayerEquipmentWithInfo;
}

export default function EquipmentCell({ equipment }: EquipmentCellProp) {
  return (
    <div className="group/item relative">
      <div
        className="flex w-full items-center space-x-4 bg-white group-hover/item:bg-gray-200"
        key={equipment.itemId}
      >
        <Image
          src={equipment.item.image}
          alt="Item image"
          width={30}
          height={30}
        />
        <div className="w-full text-wrap">{equipment.item.name}</div>
        <div className="pr-5 text-right">({equipment.part})</div>
      </div>
      <div className="absolute left-0 top-full z-10 hidden w-full rounded-md border border-black bg-slate-100 group-hover/item:block">
        <div className="flex w-full flex-col p-3">
          <div>Description: {equipment.item.description}</div>
          <div>Type: {equipment.item.type}</div>
          <div>Stats: {equipment.item.stats}</div>
        </div>
      </div>
    </div>
  );
}
