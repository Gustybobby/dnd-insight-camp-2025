import { pageAuth } from "@/server/controllers/utils";

import { PlayersMenu } from "@/components/players/PlayersMenu";

export default async function PlayersPage() {
  const session = await pageAuth.authPlayer().catch(() => null);
  const playerId = session?.user.playerId;
  return <PlayersMenu playerId={playerId ?? 0} isPlayer={!!playerId} />;
}
