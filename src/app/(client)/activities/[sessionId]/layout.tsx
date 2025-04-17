"use client";

import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const backPatterns: { pathRegex: RegExp; redirectTo: string }[] = [
  { pathRegex: /^\/activities\/.*$/, redirectTo: "/players" },
];

export default function ActivityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <main className="relative flex size-full min-h-screen flex-col justify-between overflow-hidden bg-radial-gradient from-darkred to-dark">
      <Image
        src="/asset/cover/boss_bg.jpg"
        alt="cover"
        fill
        priority
        unoptimized
        className="object-cover"
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
      <div className="my-4 w-full text-center">
        <Link
          href={"https://www.instagram.com/sinnoclub.official/"}
          target="_blank"
          className="w-fit bg-gradient-to-r from-yellow-400 via-pink-300 to-violet-400 bg-clip-text text-lg text-transparent drop-shadow-2xl"
        >
          Powered By SINNO
        </Link>
      </div>
    </main>
  );
}
