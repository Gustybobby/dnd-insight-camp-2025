import SideNav from "@/components/dashboard/SideNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="absolute flex h-screen w-screen flex-row border border-2 border-gray-200 bg-white">
      {children}
    </div>
  );
}
