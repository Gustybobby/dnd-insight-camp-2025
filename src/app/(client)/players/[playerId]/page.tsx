import { GlobalRepository } from "@/server/infrastructure/repositories/global.repository";
import { GetGlobalUseCase } from "@/server/applications/usecases/global";
import { pageAuth } from "@/server/controllers/utils";

import { redirect } from "next/navigation";

import { PlayerCharacter } from "@/components/players/details/PlayerCharacter";

export default async function PlayerCharacterPage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const global = await new GetGlobalUseCase(new GlobalRepository()).invoke();

  if (global.phase === "Choosing") {
    redirect("/players");
  }

  const { playerId } = await params;

  const session = await pageAuth.authPlayer().catch(() => null);

  return (
    <PlayerCharacter playerId={+playerId} isPlayer={!!session?.user.playerId} />
  );
}
