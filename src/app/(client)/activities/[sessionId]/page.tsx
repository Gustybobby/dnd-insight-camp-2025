import { ActivitySession } from "@/components/activities/ActivitySession";

export default async function ActivitySessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return <ActivitySession sessionId={+sessionId} />;
}
