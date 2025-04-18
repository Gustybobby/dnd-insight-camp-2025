import { pageAuth } from "@/server/controllers/utils";

import { redirect } from "next/navigation";

import StaffDashboardPageWrapper from "@/components/staff/StaffDashboardPageWrapper";

export default async function StaffPage() {
  const session = await pageAuth.authStaff().catch(() => redirect("/"));
  console.log(session);
  return <StaffDashboardPageWrapper />;
}
