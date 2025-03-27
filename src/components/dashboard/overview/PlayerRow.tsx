import type { PlayerWithAllInfo } from "@/server/domain/aggregates";
import React from "react";
import EquipmentCell from "./Equipment";
import ItemCell from "./ItemCell";
import { ALL_STAT_TYPES } from "@/shared/stat";

interface PlayerRowProp {
  player: PlayerWithAllInfo;
}

export default function PlayerRow({ player }: PlayerRowProp) {
  const statsValue = ALL_STAT_TYPES.map(
    (type) => player.stats.find((element) => element.type === type)?.value,
  );
  return (
    <tr className="border">
      <td>{player.character.name}</td>
      <td>{player.name}</td>

      {/* Stat */}
      <td>
        <div className="flex">
          {statsValue.map((value, index) => (
            <div className="flex-1 text-center" key={index}>
              {value}
            </div>
          ))}
        </div>
      </td>

      {/* Items */}
      <td>
        <div className="flex flex-col space-y-4">
          {player.playerItems.map((playerItem) => (
            <ItemCell playerItem={playerItem} key={playerItem.itemId} />
          ))}
        </div>
      </td>

      {/* Equipments */}
      <td>
        <div className="flex flex-col space-y-4">
          {player.equipments.map((playerEquipment) => (
            <EquipmentCell
              equipment={playerEquipment}
              key={playerEquipment.itemId}
            />
          ))}
        </div>
      </td>
    </tr>
  );
}
