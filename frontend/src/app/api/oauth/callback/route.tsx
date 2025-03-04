import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { getContext } from "@/lib/context/server";
import { env } from "@/app/_lib/env";
import assert from "node:assert";

type Session = { did: string };

export async function GET(request: NextRequest, response: NextResponse) {
  const params = request.nextUrl.searchParams;
  const { oauthClient, logger } = await getContext();
  try {
    const { session } = await oauthClient.callback(params);
    const clientSession = await getIronSession<Session>(request, response, {
      cookieName: "sid",
      password: env.COOKIE_SECRET,
    });
    assert(!clientSession.did, "session already exists");
    clientSession.did = session.did;
    await clientSession.save();
    return NextResponse.redirect(new URL("/"));
  } catch (err) {
    logger.error({ err }, "oauth callback failed");
    return NextResponse.redirect(new URL("/?error"));
  }
}
