import { createUser } from "@/app/functions/create-user";
import getSession, { Session } from "@/lib/auth/agent";
import { initializeContext } from "@/lib/context/server";
import { env } from "@/lib/env";
import { sessionOptions } from "@/lib/sessionOptions";
import { Agent } from "@atproto/api";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get the next URL from the request
  const nextUrl = request.nextUrl;

  try {
    // Create a Bluesky client
    const { oauthClient } = await initializeContext();

    // Get the session and state from the callback
    const { session } = await oauthClient.callback(nextUrl.searchParams);
    console.log("Session: ", session);

    // Create an agent
    const agent = new Agent(session);

    // Get the profile of the user
    const { data } = await agent.getProfile({
      actor: session.did,
    });

    // Create a user from the Bluesky profile
    const ironSession = await getIronSession<Session>(
      cookies(),
      sessionOptions
    );

    // Save the user to the session
    ironSession.user = createUser(data);

    // Save the session
    await ironSession.save();
    console.log("Iron Session: ", ironSession);
    // Redirect to the private page
    return NextResponse.redirect(
      new URL(`${env.PUBLIC_URL}/profile`, request.url)
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      // Bluesky error
      return NextResponse.redirect(
        `${env.PUBLIC_URL}/oauth/login?error=${e.message}`
      );
    } else {
      // Unknown error
      return NextResponse.redirect(
        `${env.PUBLIC_URL}/oauth/login?error=Unknown_error`
      );
    }
  }
}
