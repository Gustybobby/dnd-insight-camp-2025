import type { Metadata } from "next";

import "./globals.css";
import { Almendra, Noto_Sans_Thai } from "next/font/google";

const almendra = Almendra({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--noto-sans-thai",
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
      <body className={`${almendra.className} ${notoSansThai.variable}`}>
        <div className="flex justify-center bg-black text-black">
          <div className="h-full w-full max-w-xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
