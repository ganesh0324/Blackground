import { createUser } from "@/app/functions/create-user";
import { initializeContext } from "@/lib/context/server";
import { env } from "@/lib/env";
import { sessionOptions } from "@/lib/sessionOptions";
import { Agent } from "@atproto/api";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "@/lib/sessionOptions";
import { getSession } from "@/lib/auth/agent";

export async function GET(request: NextRequest) {
  // Get the next URL from the request
  const nextUrl = request.nextUrl;
  const { oauthClient } = await initializeContext();
  const { session } = await oauthClient.callback(nextUrl.searchParams);

  try {


    // // Create a Bluesky client


    // // Create an agent
    // const agent = new Agent(session);

    // // Get the profile of the user
    // const { data } = await agent.getProfile({
    //   actor: session.did,
    // });

    // Get the session and state from the callback

    // Create a user from the Bluesky profile
    const clientSession = await getSession();

    // Save the user to the session
    clientSession.did = session.did;
    // Save the session
    await clientSession.save();
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
