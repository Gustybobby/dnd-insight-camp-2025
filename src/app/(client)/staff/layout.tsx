import { SessionProvider } from "next-auth/react";

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="fixed left-0 flex bg-black flex-row justify-center w-full h-screen">
        <div className="flex h-screen w-full max-w-[768px] flex-row bg-radial-gradient from-darkred to-dark p-4">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
