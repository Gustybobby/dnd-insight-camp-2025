import type { Character } from "@/server/domain/models";

import Image from "next/image";

export function CharacterModel({ character }: { character: Character }) {
  return (
    <div className="motion-preset-bounce relative mb-4 max-w-32 motion-delay-200">
      <h1 className="text-center font-[family-name:var(--noto-sans-thai)] font-bold">
        {character.name}
      </h1>
      <Image
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
