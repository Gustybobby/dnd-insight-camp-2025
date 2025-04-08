"use client";

import type { PlayerWithAllInfo } from "@/server/domain/aggregates";
import React, { useState } from "react";
import EquipmentCell from "./Equipment";
import ItemCell from "./ItemCell";
import { ALL_STAT_TYPES } from "@/shared/stat";
import { useMutation } from "@tanstack/react-query";
import { resetPlayerData } from "@/server/controllers/player.controller";
import {
  addPlayerItem,
  deletePlayerItem,
} from "@/server/controllers/items.controller";
import { Item, Player } from "@/server/domain/models";
import { UseCaseParams } from "@/server/controllers/utils";
import {
  IAddPlayerItemUseCase,
  IDeletePlayerItemUseCase,
} from "@/server/applications/interfaces/usecases/item";
import ResetDataButton from "./ResetDataButton";
import { deletePlayerEquipment } from "@/server/controllers/equipment.controller";
import { IDeletePlayerEquipmentUseCase } from "@/server/applications/interfaces/usecases/player/equipment";
import AddItemSection from "./AddItemSection";

interface PlayerRowProp {
  player: PlayerWithAllInfo;
  items: Item[];
  refetch: () => void;
}

export default function PlayerRow({ player, items, refetch }: PlayerRowProp) {
  const resetPlayerMutation = useMutation({ mutationFn: resetPlayerData });
  const deletePlayerItemMutation = useMutation({
    mutationFn: deletePlayerItem,
  });
  const deleteEquipmentMutation = useMutation({
    mutationFn: deletePlayerEquipment,
  });
  const addPlayerItemMutation = useMutation({ mutationFn: addPlayerItem });

  const handleOnResetPlayer = async (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId }: { playerId: Player["id"] },
  ) => {
    event.preventDefault();
    await resetPlayerMutation
      .mutateAsync({ playerId })
      .catch((error) => console.error(error));
    refetch();
  };

  const handleOnDeletePlayerItem = async ({
    playerId,
    itemId,
  }: UseCaseParams<IDeletePlayerItemUseCase>) => {
    await deletePlayerItemMutation
      .mutateAsync({ playerId, itemId })
      .catch((error) => console.error(error));
    refetch();
  };

  const handleOnDeleteEquipment = async (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId, itemId }: UseCaseParams<IDeletePlayerEquipmentUseCase>,
  ) => {
    event.stopPropagation();
    await deleteEquipmentMutation
      .mutateAsync({ playerId, itemId })
      .catch((error) => console.error(error));
    refetch();
  };

  const handleOnAddNewItem = async (
    event: React.FormEvent<HTMLFormElement>,
    { data }: UseCaseParams<IAddPlayerItemUseCase>,
  ) => {
    event.preventDefault();
    await addPlayerItemMutation
      .mutateAsync({ data })
      .catch((error) => console.error(error));
    refetch();
  };

  const [isOpen, setIsOpen] = useState(false);

  const statsValue = ALL_STAT_TYPES.map(
    (type) => player.stats.find((element) => element.type === type)?.value,
  );
  return (
    <div
      className="cursor-pointer border-b border-black px-4 hover:bg-slate-100"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="grid grid-cols-10 py-1">
        <p className="col-span-2">{player.character.name}</p>
        <p className="col-span-2">{player.name}</p>

        <div className="col-span-4 flex">
          {statsValue.map((value, index) => (
            <div className="flex-1 text-center" key={index}>
              {value}
            </div>
          ))}
        </div>

        <div className="col-span-2 flex justify-end">
          <ResetDataButton
            playerId={player.id}
            handleOnResetPlayer={handleOnResetPlayer}
          />
        </div>
      </div>

      {/* Dropdown */}
      <div className={`w-full py-4 ${isOpen ? "block" : "hidden"} `}>
        <div className="grid grid-cols-2 gap-12 px-12">
          {/* Items */}
          <div className="flex flex-col items-center space-y-2">
            <h2 className="font-bold">Items</h2>
            {player.playerItems.map((item) => (
              <ItemCell
                playerItem={item}
                key={item.itemId}
                handleOnDeletePlayerItem={handleOnDeletePlayerItem}
              ></ItemCell>
            ))}
            <AddItemSection
              items={items}
              playerId={player.id}
              handleOnAddNewItem={handleOnAddNewItem}
            />
          </div>

          {/* Equipments */}
          <div className="flex flex-col items-center space-y-2">
            <h2 className="font-bold">Equipments</h2>
            {player.equipments.map((equipment) => (
              <EquipmentCell
                equipment={equipment}
                handleOnDeleteEquipment={handleOnDeleteEquipment}
                key={equipment.itemId}
              ></EquipmentCell>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
