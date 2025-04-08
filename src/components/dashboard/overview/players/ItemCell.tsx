"use client";
import type { IDeletePlayerItemUseCase } from "@/server/applications/interfaces/usecases/item";
import type { PlayerItemWithInfo } from "@/server/domain/aggregates";
import type { UseCaseParams } from "@/server/controllers/utils";

import React, { useState } from "react";

import Image from "next/image";

interface ItemCellProp {
  playerItem: PlayerItemWithInfo;
  handleOnDeletePlayerItem: ({
    playerId,
    itemId,
  }: UseCaseParams<IDeletePlayerItemUseCase>) => Promise<void>;
}

export default function ItemCell({
  playerItem,
  handleOnDeletePlayerItem,
}: ItemCellProp) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsLoading(true);
    await handleOnDeletePlayerItem({
      playerId: playerItem.playerId,
      itemId: playerItem.itemId,
    });
    setIsLoading(false);
  };
  return (
    <div
      className="flex w-full items-center space-x-4 rounded-lg border border-black bg-white px-4"
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
      <div className="flex">
        <button
          className="rounded-lg bg-gray-400 p-1 px-2 text-sm hover:bg-gray-500"
          onClick={(event) => handleOnClick(event)}
          disabled={isLoading}
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
