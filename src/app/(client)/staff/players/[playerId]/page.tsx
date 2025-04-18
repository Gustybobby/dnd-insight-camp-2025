import { pageAuth } from "@/server/controllers/utils";

import { redirect } from "next/navigation";

import { PlayerCharacterStaff } from "@/components/staff/players/PlayerCharacterStaff";

export default async function PlayerCharacterPage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const session = await pageAuth.authStaff().catch(() => redirect("/"));
  console.log(session);
  const { playerId } = await params;

  return <PlayerCharacterStaff playerId={+playerId} />;
}
