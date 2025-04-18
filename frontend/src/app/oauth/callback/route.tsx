import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { getAppContext, initializeContext } from "@/lib/context/server";
import { env } from "@/lib/env";
import assert from "node:assert";
import { cookies } from "next/headers";

type Session = { did: string };

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const { oauthClient, logger } = await initializeContext();
  
  try {
    const { session } = await oauthClient.callback(params);

    // Fix: Cast `request` to `Request` for compatibility
    const clientSession = await getIronSession<Session>(cookies(), {
      cookieName: "sid",
      password: env.COOKIE_SECRET,
    });

    assert(!clientSession.did, "session already exists");
    clientSession.did = session.did;
    await clientSession.save();

    console.log(clientSession.did);
    return NextResponse.redirect(new URL("/profile", request.url));
  } catch (err) {
    logger.error({ err }, "oauth callback failed");
    return NextResponse.redirect(new URL("/?error", request.url));
  }
}