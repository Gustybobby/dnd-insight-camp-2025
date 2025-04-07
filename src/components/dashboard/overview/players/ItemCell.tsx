import type { PlayerItemWithInfo } from "@/server/domain/aggregates";

import React from "react";

import Image from "next/image";
import { UseCaseParams } from "@/server/controllers/utils";
import { IDeletePlayerItemUseCase } from "@/server/applications/interfaces/usecases/item";

interface ItemCellProp {
  playerItem: PlayerItemWithInfo;
  handleOnDeletePlayerItem: (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId, itemId }: UseCaseParams<IDeletePlayerItemUseCase>,
  ) => void;
}

export default function ItemCell({
  playerItem,
  handleOnDeletePlayerItem,
}: ItemCellProp) {
  return (
    <div
      className="flex w-full items-center space-x-4 px-4"
      key={playerItem.itemId}
    >
      <Image
        src={playerItem.item.image}
        alt="Item image"
        width={30}
        height={30}
      />
      <div className="w-full text-wrap">
        {playerItem.item.name} ({playerItem.amount})
      </div>
      <div className="flex pr-12">
        <button
          className="size-8 rounded-full bg-gray-400"
          onClick={(event) =>
            handleOnDeletePlayerItem(event, {
              playerId: playerItem.playerId,
              itemId: playerItem.itemId,
            })
          }
        ></button>
      </div>
    </div>
  );
}
