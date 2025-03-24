import { PlayerCharacterStaff } from "@/components/staff/players/PlayerCharacterStaff";

export default async function PlayerCharacterPage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = await params;

  return <PlayerCharacterStaff playerId={+playerId} />;
}
