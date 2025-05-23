import type { PlayerEquipmentWithInfo } from "@/server/domain/aggregates";
import type { Character } from "@/server/domain/models";

import { TitleBanner } from "@/components/players/components";
import { EquipmentsBar } from "@/components/players/details/equipment";
import { mapNumToAlphabet } from "@/components/utils";
import Image from "next/image";

export function CharacterModel({ character }: { character: Character }) {
  return (
    <div className="motion-preset-bounce relative mb-4 max-w-32 motion-delay-200">
      <h1 className="text-center font-notosansthai font-bold">
        {character.name}
      </h1>
      <Image
        id="character_model"
        key={character.id}
        src={character.image}
        alt={character.name}
        priority
        unoptimized
        width={500}
        height={500}
        className="relative z-10 h-full w-fit"
        quality={100}
      />
      <div className="absolute -bottom-2 left-0 right-0 mx-auto h-14 w-32 rounded-[50%] bg-black opacity-20" />
    </div>
  );
}

export function CharacterInfo({
  playerId,
  character,
  playerEquipments,
  onClickEquipment,
}: {
  playerId: number;
  character: Character | null;
  playerEquipments: PlayerEquipmentWithInfo[] | null;
  onClickEquipment?: (itemId: PlayerEquipmentWithInfo["itemId"]) => void;
}) {
  return (
    <>
      <TitleBanner>Player {mapNumToAlphabet(playerId)}</TitleBanner>
      <div className="mx-auto h-0.5 w-11/12 bg-black" />
      <div className="grid grid-cols-3 place-items-center p-2 px-8">
        <div className="col-span-2">
          {character && <CharacterModel character={character} />}
        </div>
        {playerEquipments && (
          <EquipmentsBar
            equipments={playerEquipments}
            onClickEquipment={onClickEquipment}
          />
        )}
      </div>
    </>
  );
}
