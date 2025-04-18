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
    <div className="flex w-full flex-col p-2">
      {player?.effects
        .filter((effect) => VISUAL_EFFECT_NAME_LIST.includes(effect.type))
        .map((status) => {
          return (
            <div
              key={`status-${status.id}`}
              className="flex w-full flex-row justify-between text-2xl"
              onClick={()=>{}}
            >
              <div className="flex flex-row gap-x-4 items-center">
                <div className="rounded-full border-2 h-[70px] w-[70px] border-black flex justify-center items-center">
                  <Image
                    src={
                      VISUAL_EFFECT_LISTS.find(
                        (val) => val.name === status.type,
                      )?.image ?? ""
                    }
                    alt={status.type}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px]"
                  />
                </div>
                <div className="flex-col">
                  <div className="">{status.type}</div>
                  <div className="">{`Turns Left ${status.countdown}`}</div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
