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
import { IRemoveEquipmentUseCase } from "@/server/applications/interfaces/usecases/player/equipment";
import {
  deletePlayerEquipment,
  playerRemoveEquipment,
} from "@/server/controllers/equipment.controller";
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
  const unequipEquipmentMutation = useMutation({
    mutationFn: playerRemoveEquipment,
  });
  const deleteEquipmentMutation = useMutation({
    mutationFn: deletePlayerEquipment,
  });
  const addPlayerItemMutation = useMutation({ mutationFn: addPlayerItem });

  const handleOnResetPlayer = (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId }: { playerId: Player["id"] },
  ) => {
    event.preventDefault();
    resetPlayerMutation.mutate(
      { playerId },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  const handleOnDeletePlayerItem = (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId, itemId }: UseCaseParams<IDeletePlayerItemUseCase>,
  ) => {
    event.stopPropagation();
    deletePlayerItemMutation.mutate(
      { playerId, itemId },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  const handleOnUnequipEquipment = (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId, itemId }: UseCaseParams<IRemoveEquipmentUseCase>,
  ) => {
    event.stopPropagation();
    unequipEquipmentMutation.mutate(
      { playerId, itemId },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  const handleOnDeleteEquipment = (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId, itemId }: UseCaseParams<IDeletePlayerEquipmentUseCase>,
  ) => {
    event.stopPropagation();
    deleteEquipmentMutation.mutate(
      { playerId, itemId },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  const handleOnAddNewItem = async (
    event: React.FormEvent<HTMLFormElement>,
    { data }: UseCaseParams<IAddPlayerItemUseCase>,
  ) => {
    event.preventDefault();

    addPlayerItemMutation.mutate(
      { data },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
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
                handleOnUnequipEquipment={handleOnUnequipEquipment}
                key={equipment.itemId}
              ></EquipmentCell>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
