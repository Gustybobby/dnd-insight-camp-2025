import { GlobalRepository } from "@/server/infrastructure/repositories/global.repository";
import { GetGlobalUseCase } from "@/server/applications/usecases/global";
import { pageAuth } from "@/server/controllers/utils";

import { redirect } from "next/navigation";

import { PlayerCharacter } from "@/components/players/details/PlayerCharacter";

export default async function ActivitySessionPlayerCharacterPage({
  params,
}: {
  params: Promise<{ sessionId: string; playerId: string }>;
}) {
  const global = await new GetGlobalUseCase(new GlobalRepository()).invoke();

  if (global.phase === "Choosing") {
    redirect("/players");
  }

  const { sessionId, playerId } = await params;

  const session = await pageAuth.authPlayer().catch(() => null);

  const isSessionPlayer = session?.user.playerId === +playerId;
  if (!isSessionPlayer) {
    redirect(`/activities/${sessionId}`);
  }

  return <PlayerCharacter playerId={+playerId} isPlayer={isSessionPlayer} />;
}
