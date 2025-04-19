import type { NextRequest } from "next/server";

import { getPlayerAllInfo } from "@/server/controllers/queries/player.query";

import { NextResponse } from "next/server";

export const revalidate = 2;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ playerId: string }> },
) {
  const { playerId } = await params;

  const action = req.nextUrl.searchParams.get("action");
  switch (action) {
    case "allInfo":
      return NextResponse.json(
        await getPlayerAllInfo({ playerId: +playerId }),
        { status: 200 },
      );
  }
  return NextResponse.json(null, { status: 405 });
}
