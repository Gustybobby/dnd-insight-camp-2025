import { pageAuth } from "@/server/controllers/utils";

import { PlayerCharacter } from "@/components/players/details/PlayerCharacter";

export default async function PlayerCharacterPage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = await params;

  const session = await pageAuth.authPlayer().catch(() => null);

  return (
    <PlayerCharacter playerId={+playerId} isPlayer={!!session?.user.playerId} />
  );
}
