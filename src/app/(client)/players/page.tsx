import { pageAuth } from "@/server/controllers/utils";

import { PlayerSelectMenu } from "@/components/players/PlayerSelectMenu";

export default async function PlayersPage() {
  const session = await pageAuth.authPlayer().catch(() => null);
  const playerId = session?.user.playerId;
  return <PlayerSelectMenu playerId={playerId ?? 0} isPlayer={!!playerId} />;
}
