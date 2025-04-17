import Link from "next/link";
import React from "react";
import Image from "next/image";

interface TopNavProps {
  title: string;
  backLink: string;
}

export default function TopNav({ title, backLink }: TopNavProps) {
  return (
    <div className="grid grid-cols-3 rounded-md border-2 border-oldcream bg-cream px-4 py-2 text-xl">
      <Link href={backLink}>
        <Image
          src={"/asset/props/back_arrow.png"}
          alt={"back"}
          width={40}
          height={40}
        />
      </Link>
      <h1 className="self-center text-center text-3xl font-bold text-black">
        {title}
      </h1>
    </div>
  );
}
