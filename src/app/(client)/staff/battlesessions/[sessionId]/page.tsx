import StaffBattleSession from "@/components/staff/battle/StaffBattleSession";
import { PlayerCharacterStaff } from "@/components/staff/players/PlayerCharacterStaff";

export default async function StaffSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return <StaffBattleSession sessionId={+sessionId} />;
}
