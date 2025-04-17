import StaffBattleSession from "@/components/staff/battle/StaffBattleSession";

export default async function StaffSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return <StaffBattleSession sessionId={+sessionId} />;
}
