"use client";

import SideNav from "@/components/dashboard/SideNav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function QueryClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full flex-row bg-white">
        <SideNav />
        {children}
      </div>
    </QueryClientProvider>
  );
}
