import React from "react";

import Link from "next/link";

const menu = [
  {
    href: "/dashboard/overview",
    label: "Overview",
  },
  {
    href: "/dashboard/players",
    label: "Players",
  },
  {
    href: "/dashboard/characters",
    label: "Characters",
  },
];

export default function SideNav() {
  return (
    <div className="h-full w-64 bg-gray-800 text-white">
      <h2 className="p-4 text-2xl font-bold">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block rounded px-4 py-2.5 hover:bg-gray-700"
            >
              {item.label}
            </Link>
          ))}
        </li>
      </ul>
    </div>
  );
}
