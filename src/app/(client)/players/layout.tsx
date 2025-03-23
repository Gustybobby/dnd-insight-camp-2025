"use client";

import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const backPatterns: { pathRegex: RegExp; redirectTo: string }[] = [
  { pathRegex: /^\/players\/.*$/, redirectTo: "/players" },
  { pathRegex: /^\/players/, redirectTo: "/" },
];

export default function CharacterMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="relative size-full min-h-screen overflow-hidden">
      <Image
        src="/asset/cover/player_select_bg.jpg"
        alt="cover"
        fill
        priority
        unoptimized
        className="scale-115 object-cover"
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
      <Link
        href={
          backPatterns.find(({ pathRegex }) => pathname.match(pathRegex))
            ?.redirectTo ?? "/"
        }
      >
        <Image
          src="/asset/props/back_arrow.png"
          alt="back arrow"
          priority
          unoptimized
          width={500}
          height={500}
          className="absolute left-4 top-4 size-12 transition-all hover:scale-105"
        />
      </Link>
      {children}
    </div>
  );
}
