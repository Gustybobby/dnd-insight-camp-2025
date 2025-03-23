"use client";

import { CharacterModel } from "@/components/players/components";
import { getAllCharacters } from "@/server/controllers/character.controller";
import { getAllPlayers } from "@/server/controllers/player.controller";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: players, isRefetching: isPlayersRefetching } = useQuery({
    queryKey: ["getAllPlayers"],
    queryFn: async () => await getAllPlayers(),
    refetchInterval: 5000,
  });

  const { data: characters } = useQuery({
    queryKey: ["getAllCharacters"],
    queryFn: async () => await getAllCharacters(),
  });

  return (
    <div className="flex flex-col items-center gap-y-4">
      <h1 className="">Players</h1>
      <div className="grid grid-cols-4 gap-x-4">
        {players?.map((player) => (
          <Link
            className="p-4"
            key={player.id}
            href={`staff/players/${player.id}`}
          >
            <p>name: {player.name}</p>
            <Image
              src={player.character.image}
              width={200}
              height={200}
              alt={player.character.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
