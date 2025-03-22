import { StyledLink } from "@/components/ui/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative size-full min-h-screen overflow-hidden">
      <Image
        src="/asset/cover/bg.webp"
        alt="cover"
        fill
        priority
        unoptimized
        className="scale-115 object-cover blur-[2px] contrast-125"
      />
      <Image
        src="/asset/cover/camp_logo.webp"
        alt="logo"
        priority
        unoptimized
        width={500}
        height={500}
        className="motion-preset-shrink absolute left-0 right-0 top-[5%] mx-auto w-full max-w-[50vh] contrast-125 drop-shadow-2xl"
      />
      <Image
        src="/asset/characters/praram.png"
        alt="praram"
        priority
        unoptimized
        width={500}
        height={500}
        className="motion-preset-shake motion-duration-700 absolute -left-2 top-[7%] w-1/3 max-w-[12rem]"
      />
      <Image
        src="/asset/characters/mungkorn.png"
        alt="mungkorn"
        priority
        unoptimized
        width={500}
        height={500}
        className="max-w-3xs motion-preset-slide-left absolute -right-6 -top-[3%] w-[44%] -rotate-12"
      />
      <Image
        src="/asset/characters/orca_thai.png"
        alt="orca_thai"
        priority
        unoptimized
        width={500}
        height={500}
        className="motion-preset-pop motion-duration-200 absolute left-1/2 top-[45%] w-1/2 max-w-[16rem] -translate-x-[65%]"
      />
      <Image
        src="/asset/props/dice.png"
        alt="dice"
        priority
        unoptimized
        width={500}
        height={500}
        className="max-w-3xs motion-preset-oscillate motion-duration-1500 motion-opacity-in-0 absolute left-1/2 top-[47%] w-1/6 translate-x-[25%]"
      />
      <StyledLink
        href="/staff"
        className="motion-preset-bounce motion-delay-200 absolute bottom-[20%] p-2 text-xl"
        spanClassName="bg-lightorange border-lightorange"
      >
        Staff Login
      </StyledLink>
      <StyledLink
        href="/game"
        className="motion-preset-bounce motion-delay-300 absolute bottom-[10%] px-12 py-2 text-3xl"
      >
        Play
      </StyledLink>
    </div>
  );
}
