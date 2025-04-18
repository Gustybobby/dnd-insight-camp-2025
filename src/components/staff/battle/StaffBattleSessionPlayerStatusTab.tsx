import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

import React from "react";

import { VISUAL_EFFECT_NAME_LIST } from "../constants";

export default function StaffBattleSessionPlayerStatusTab({
  player,
}: {
  player: PlayerWithAllInfo | null | undefined;
}) {
  console.log("Effects:", player?.effects);
  return (
    <div>
      {player?.effects
        .filter((effect) => VISUAL_EFFECT_NAME_LIST.includes(effect.type))
        .map((status) => {
          return (
            <div key={`status-${status.id}`} className="flex w-full">
              <div>{status.type}</div>
              <div>{status.countdown}</div>
            </div>
          );
        })}
    </div>
  );
}
