import { SessionProvider } from "next-auth/react";

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="fixed left-0 flex h-screen w-full flex-row justify-center bg-black">
        <div className="flex h-screen w-full max-w-[768px] flex-row bg-radial-gradient from-darkred to-dark p-4">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
