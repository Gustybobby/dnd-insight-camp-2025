"use client";

import { getAllCharacters } from "@/server/controllers/character.controller";
import { getAllPlayers } from "@/server/controllers/player.controller";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Test() {
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
    <div>
      <div>
        Test Players:{" "}
        {isPlayersRefetching ? "refetching" : JSON.stringify(players)}
      </div>
      <div>
        Test Characters:{" "}
        {characters?.map((character) => (
          <div className="p-4" key={character.id}>
            <p>id: {character.id}</p>
            <p>name: {character.name}</p>
            <Image
              src={character.image}
              width={200}
              height={200}
              alt={character.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
