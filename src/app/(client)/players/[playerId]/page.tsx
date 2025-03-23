import { PlayerCharacter } from "@/components/players/PlayerCharacter";

export default async function PlayerCharacterPage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = await params;

  return <PlayerCharacter playerId={+playerId} />;
}
