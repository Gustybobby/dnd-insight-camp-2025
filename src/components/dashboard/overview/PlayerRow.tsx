import { PlayerWithAllInfo } from "@/server/domain/aggregates";
import React from "react";
import PlayerStatsCell from "./PlayerStatsCell";
import ItemCell from "./ItemCell";
import EquipmentCell from "./Equipment";

interface PlayerRowProp {
  player: PlayerWithAllInfo;
}

export default function PlayerRow({ player }: PlayerRowProp) {
  return (
    <tr className="border">
      <td>{player.character.name}</td>
      <td>{player.name}</td>
      <PlayerStatsCell stats={player.stats} />

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
