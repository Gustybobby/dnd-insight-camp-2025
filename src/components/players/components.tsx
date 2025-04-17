import { cn } from "@/components/utils";
import Image from "next/image";

export function CharacterBox({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn("rounded-lg border-4 border-black bg-cream", className)}
    >
      {children}
    </section>
  );
}

export function TitleBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="motion-preset-pop relative flex h-20 items-center justify-center motion-duration-200">
      <Image
        src={"/asset/props/title_banner.png"}
        alt="banner image"
        className="absolute w-80"
        width={200}
        height={200}
      />
      <div className="z-10 mb-8 text-2xl">{children}</div>
    </div>
  );
}
