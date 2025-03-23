import { charactersTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";

import "dotenv/config";

const SEED_CHARACTERS = [
  { name: "ชาละวัน", image: "/asset/characters/chalawan.png" },
  { name: "แก้วหน้าม้า", image: "/asset/characters/kaewnama.png" },
  { name: "ไกรทอง", image: "/asset/characters/kraitong.png" },
  { name: "เมขลา", image: "/asset/characters/mekla.png" },
  { name: "มังกร", image: "/asset/characters/mungkorn.png" },
  { name: "ออก้าชุดไทย", image: "/asset/characters/orca_thai.png" },
  { name: "พระอภัยมณี", image: "/asset/characters/praapaimanee.png" },
  { name: "พระราม", image: "/asset/characters/praram.png" },
  { name: "วันทอง", image: "/asset/characters/wantong.png" },
];

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const count = await db.$count(charactersTable);
  if (count > 0) {
    throw new Error("characters table is not empty");
  }

  console.log("seeding database with", SEED_CHARACTERS.length, "characters");
  await db.insert(charactersTable).values(SEED_CHARACTERS);
  console.log("seeding completed");
}

void main();
