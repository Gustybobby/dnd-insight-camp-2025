import type { NextRequest } from "next/server";

import {
  getAllPlayers,
  getAllPlayersInfo,
} from "@/server/controllers/queries/players.query";

import { NextResponse } from "next/server";

export const revalidate = 5;

export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action");
  switch (action) {
    case "all":
      return NextResponse.json(await getAllPlayers(), { status: 200 });
    case "allInfo":
      return NextResponse.json(await getAllPlayersInfo(), { status: 200 });
  }
  return NextResponse.json(null, { status: 405 });
}
