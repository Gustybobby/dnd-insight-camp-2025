"use client";

import { getAllPlayers } from "@/server/controllers/player.controller";

import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: players } = useQuery({
    queryKey: ["getAllPlayers"],
    queryFn: async () => await getAllPlayers(),
    refetchInterval: 5000,
  });

  return (
    <div className="flex flex-col items-center gap-y-4 rounded rounded-md bg-cream p-4">
      <h1 className="text-4xl">Players</h1>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2">
        {players?.map((player) => (
          <Link
            className="flex flex-col items-center rounded rounded-md border border-2 border-black bg-white p-4 shadow"
            key={player.id}
            href={`staff/players/${player.id}`}
          >
            <p>Group {player.id}</p>
            <p>{player.name}</p>
            <Image
              src={player.character.image}
              width={200}
              height={200}
              className="h-32 h-auto"
              alt={player.character.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
