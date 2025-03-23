import type { SubmitHandler } from "react-hook-form";

import { getAllCharacters } from "@/server/controllers/character.controller";
import { createPlayer } from "@/server/controllers/player.controller";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import Image from "next/image";

interface PlayerFormData {
  name: string;
  characterId: number;
}

// for dashboard:
// - form for creating player
//    fields: name, character_id, user_id (optional)
// submit form call createPlayer() from player.controller
// this one use server action so you can call directly on frontend

export default function CreatePlayerForm() {
  const mutation = useMutation({
    mutationFn: (newPlayer: PlayerFormData) =>
      createPlayer({ data: { ...newPlayer, userId: null } }),
    onSuccess: () => {
      alert(`Player created successfully!`);
    },
  });
  const { register, handleSubmit, setValue } = useForm<PlayerFormData>();
  const onSubmit: SubmitHandler<PlayerFormData> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    mutation.mutate(data);
  };

  const { data: characters } = useQuery({
    queryKey: ["getAllCharacters"],
    queryFn: async () => await getAllCharacters(),
  });

  const [selectedCharId, setSelectedCharId] = useState<number | null>(null);

  const handleSelect = (characterId: number) => {
    setSelectedCharId(characterId);
    setValue("characterId", characterId);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center rounded-sm border-2 p-4 text-center"
    >
      <h1 className="">Create Player</h1>
      <div className="flex flex-row gap-x-4">
        <label htmlFor="name">Name</label>
        <input
          className="border-1 w-full border border-gray-100"
          required
          {...register("name")}
        />
      </div>
      <div className="flex w-full flex-col justify-center">
        <div className="grid grid-cols-3 gap-x-4">
          {characters?.map((character) => (
            <div
              className={`shadows m-2 h-auto w-full cursor-pointer rounded-md p-2 text-xs hover:bg-gray-100 ${selectedCharId === character.id ? "border-4 border-red-200" : "border-2 border-gray-200"}`}
              key={character.id}
              onClick={() => handleSelect(character.id)}
              {...register("characterId")}
            >
              <Image
                src={character.image}
                width={100}
                height={100}
                alt={character.name}
                className="h-16 w-auto"
              />
              <p>Id: {character.id}</p>
              <p>Name: {character.name}</p>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="border-2">
        Create Player
      </button>
    </form>
  );
}
