import type { Metadata } from "next";

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DnD Insight Camp 2025",
  description: "Dungeons & Dragons Insight Camp 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <div className="flex justify-center bg-black">
          <div className="h-full w-full max-w-xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
