import SideNav from "@/components/dashboard/SideNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full flex-row bg-white">
      <SideNav />
      {children}
    </div>
  );
}
