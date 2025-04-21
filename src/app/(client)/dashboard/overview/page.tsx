import OverviewDashboard from "@/components/dashboard/overview/OverviewDashboardWrapper";
import { pageAuth } from "@/server/controllers/utils";

export default async function DashboardOverviewPage() {
  const session = await pageAuth.authStaff().catch(() => null);
  console.log(session);
  return <OverviewDashboard />;
}
