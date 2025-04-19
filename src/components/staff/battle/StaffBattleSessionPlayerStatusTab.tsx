import type { PlayerWithAllInfo } from "@/server/domain/aggregates";

import React from "react";

import { VISUAL_EFFECT_LISTS, VISUAL_EFFECT_NAME_LIST } from "../constants";
import Image from "next/image";

export default function StaffBattleSessionPlayerStatusTab({
  player,
}: {
  player: PlayerWithAllInfo | null | undefined;
}) {
  console.log("Effects:", player?.effects);
  return (
    <div className="flex w-full flex-col gap-y-2 p-2">
      {player?.effects && player?.effects.length > 0 ? (
        player?.effects
          .filter((effect) => VISUAL_EFFECT_NAME_LIST.includes(effect.type))
          .map((status) => {
            return (
              <div
                key={`status-${status.id}`}
                className="flex w-full flex-row justify-between text-2xl"
                onClick={() => {}}
              >
                <div className="flex flex-row items-center gap-x-4">
                  <div className="flex aspect-square size-14 items-center justify-center rounded-full border-2 border-black bg-radial-gradient from-seafoam to-dexcolor-in">
                    <Image
                      src={
                        VISUAL_EFFECT_LISTS.find(
                          (val) => val.name === status.type,
                        )?.image ?? ""
                      }
                      alt={status.type}
                      width={50}
                      height={50}
                      className="h-[30px] w-[30px]"
                    />
                  </div>
                  <div className="text-md flex-col">
                    <div className="text-lg font-bold">{status.type}</div>
                    <div className="text-lg italic">{`Last for (Turn): ${status.countdown}`}</div>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <div className="flex w-full justify-center text-center">
          No Status Effects
        </div>
      )}
    </div>
  );
}
