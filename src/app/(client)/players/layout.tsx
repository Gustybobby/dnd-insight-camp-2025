"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CharacterMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <div className="relative size-full min-h-screen overflow-hidden">
      <Image
        src="/asset/cover/player_select_bg.jpg"
        alt="cover"
        fill
        priority
        unoptimized
        className="scale-115 object-cover contrast-[110%]"
      />
      <Image
        src="/asset/props/logo_wing.png"
        alt="wing"
        priority
        unoptimized
        width={500}
        height={500}
        className="absolute left-0 right-0 top-[5%] mx-auto w-3/5 max-w-[50vh]"
      />
      <button onClick={() => router.back()}>
        <Image
          src="/asset/props/back_arrow.png"
          alt="back arrow"
          priority
          unoptimized
          width={500}
          height={500}
          className="absolute left-4 top-4 size-12 transition-all hover:scale-105"
        />
      </button>
      {children}
    </div>
  );
}
