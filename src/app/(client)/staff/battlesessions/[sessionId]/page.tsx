import StaffBattleSession from "@/components/staff/battleSession/StaffBattleSession";
import { PlayerCharacterStaff } from "@/components/staff/players/PlayerCharacterStaff";

export default async function StaffSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return <StaffBattleSession playerId={+sessionId} />;
}
