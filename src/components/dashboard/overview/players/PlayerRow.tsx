"use client";

import type { PlayerWithAllInfo } from "@/server/domain/aggregates";
import React, { useState } from "react";
import EquipmentCell from "./Equipment";
import ItemCell from "./ItemCell";
import { ALL_STAT_TYPES } from "@/shared/stat";
import { useMutation } from "@tanstack/react-query";
import { resetPlayerData } from "@/server/controllers/player.controller";
import { deletePlayerItem } from "@/server/controllers/items.controller";
import { Player } from "@/server/domain/models";
import { UseCaseParams } from "@/server/controllers/utils";
import { IDeletePlayerItemUseCase } from "@/server/applications/interfaces/usecases/item";
import ResetDataButton from "./ResetDataButton";
import { IRemoveEquipmentUseCase } from "@/server/applications/interfaces/usecases/player/equipment";
import { playerRemoveEquipment } from "@/server/controllers/equipment.controller";

interface PlayerRowProp {
  player: PlayerWithAllInfo;
  refetch: () => void;
}

export default function PlayerRow({ player, refetch }: PlayerRowProp) {
  const resetPlayerMutation = useMutation({ mutationFn: resetPlayerData });
  const deletePlayerItemMutation = useMutation({
    mutationFn: deletePlayerItem,
  });
  const deleteEquipmentMutation = useMutation({
    mutationFn: playerRemoveEquipment,
  });

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
          console.error("Mutation failed:", error);
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
          console.error("Mutation failed:", error);
        },
      },
    );
  };

  const handleOnDeleteEquipment = (
    event: React.MouseEvent<HTMLButtonElement>,
    { playerId, itemId }: UseCaseParams<IRemoveEquipmentUseCase>,
  ) => {
    event.stopPropagation();
    deleteEquipmentMutation.mutate(
      { playerId, itemId },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error("Mutation failed:", error);
        },
      },
    );
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const statsValue = ALL_STAT_TYPES.map(
    (type) => player.stats.find((element) => element.type === type)?.value,
  );
  return (
    <div className="group border" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="grid cursor-pointer grid-cols-9 py-1 group-hover:bg-slate-100">
        <p className="col-span-2">{player.character.name}</p>
        <p className="col-span-2">{player.name}</p>

        <div className="col-span-4 flex">
          {statsValue.map((value, index) => (
            <div className="flex-1 text-center" key={index}>
              {value}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <ResetDataButton
            playerId={player.id}
            handleOnResetPlayer={handleOnResetPlayer}
          />
        </div>
      </div>

      {/* Dropdown */}
      <div
        className={`w-full ${isExpanded ? "block" : "hidden"} group-hover:bg-slate-100`}
      >
        <div className="grid grid-cols-2">
          {/* Items */}
          <div className="flex flex-col">
            {player.playerItems.map((item) => (
              <ItemCell
                playerItem={item}
                key={item.itemId}
                handleOnDeletePlayerItem={handleOnDeletePlayerItem}
              ></ItemCell>
            ))}
          </div>

          {/* Equipments */}
          <div className="flex flex-col">
            {player.equipments.map((equipment) => (
              <EquipmentCell
                equipment={equipment}
                key={equipment.itemId}
              ></EquipmentCell>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
