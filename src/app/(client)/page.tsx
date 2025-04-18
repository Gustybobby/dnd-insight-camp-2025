import { pageAuth } from "@/server/controllers/utils";

import { GameHome } from "@/components/GameHome";

export default async function Home() {
  const session = await pageAuth.authPlayer().catch(() => null);

  return <GameHome isPlayer={!!session?.user.playerId} />;
}
