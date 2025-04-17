import { GlobalRepository } from "@/server/infrastructure/repositories/global.repository";
import { GetGlobalUseCase } from "@/server/applications/usecases/global";

import { redirect } from "next/navigation";

import { ActivitySession } from "@/components/activities/ActivitySession";

export default async function ActivitySessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const global = await new GetGlobalUseCase(new GlobalRepository()).invoke();

  if (global.phase === "Choosing") {
    redirect("/players");
  }

  const { sessionId } = await params;
  return <ActivitySession sessionId={+sessionId} />;
}
