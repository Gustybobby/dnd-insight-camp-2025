import { Item } from "@/server/domain/models";
import React from "react";
import Image from "next/image";

interface ItemBoxProp {
  item: Item | null;
}

export default function ItemBox({ item }: ItemBoxProp) {
  if (item)
    return (
      <div className="relative">
        <div className="flex space-x-2">
          <Image src={item.image} alt="img" width={30} height={30}></Image>
          <p>{item.name}</p>
        </div>
      </div>
    );
}
