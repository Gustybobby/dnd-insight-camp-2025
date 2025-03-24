export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed left-0 flex h-screen flex-row border-2 border-gray-200 bg-radial-gradient from-darkred to-dark p-4">
      {children}
    </div>
  );
}
