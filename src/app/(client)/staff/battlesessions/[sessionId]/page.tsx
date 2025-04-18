import { pageAuth } from "@/server/controllers/utils";

import { redirect } from "next/navigation";

import StaffBattleSession from "@/components/staff/battle/StaffBattleSession";

export default async function StaffSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const session = await pageAuth.authStaff().catch(() => redirect("/"));
  console.log(session);
  const { sessionId } = await params;

  return <StaffBattleSession sessionId={+sessionId} />;
}
