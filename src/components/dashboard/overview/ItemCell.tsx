import type { PlayerItemWithInfo } from "@/server/domain/aggregates";

import React from "react";

import Image from "next/image";

interface ItemCellProp {
  playerItem: PlayerItemWithInfo;
}

export default function ItemCell({ playerItem }: ItemCellProp) {
  return (
    <div className="group/item relative">
      <div
        className="flex w-full items-center space-x-4 bg-white group-hover/item:bg-gray-200"
        key={playerItem.itemId}
      >
        <Image
          src={playerItem.item.image}
          alt="Item image"
          width={30}
          height={30}
        />
        <div className="w-full text-wrap">{playerItem.item.name}</div>
        <div className="pr-5 text-right">({playerItem.amount})</div>
      </div>
      <div className="absolute left-0 top-full z-10 hidden w-full rounded-md border border-black bg-slate-100 group-hover/item:block">
        <div className="flex w-full flex-col p-3">
          <div>Description: {playerItem.item.description}</div>
          <div>Type: {playerItem.item.type}</div>
          <div>Stats: {playerItem.item.stats}</div>
        </div>
      </div>
    </div>
  );
}
