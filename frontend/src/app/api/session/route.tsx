export const runtime = "nodejs";

import getSession, { Session } from "@/lib/auth/agent";
import { sessionOptions } from "@/lib/sessionOptions";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getIronSession<Session>(cookies(), sessionOptions);

  if (!session?.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
