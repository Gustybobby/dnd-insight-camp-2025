import type { Metadata } from "next";

import "./globals.css";
import { Almendra } from "next/font/google";

const almendra = Almendra({
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
      <body className={almendra.className}>
        <div className="flex justify-center bg-black text-black">
          <div className="h-full w-full max-w-xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
