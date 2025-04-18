export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed left-0 flex min-h-lvh w-full flex-row justify-center bg-black">
      <div className="flex h-lvh w-full min-w-[768px] max-w-[1180px] flex-row bg-radial-gradient from-darkred to-dark p-4">
        {children}
      </div>
    </div>
  );
}
