// import { NextRequest, NextResponse } from "next/server";
// import { getIronSession } from "iron-session";
// import { initializeContext } from "@/lib/context/server";
// import { env } from "@/lib/env";
// import assert from "node:assert";
// import { cookies } from "next/headers";
// import {logger} from "@/lib/logger"

// type Session = { did: string };

// export async function GET(request: NextRequest) {
//   logger.info("OAUTH CALLBACK HEREE BROO!!!")
//   const params = request.nextUrl.searchParams;
//   const { oauthClient } = await initializeContext();
  
//   try {
//     const { session } = await oauthClient.callback(params);
//     // console.log("OAUTH PARAMETER: ", session)

//     // Fix: Cast `request` to `Request` for compatibility
//     const clientSession = await getIronSession<Session>(cookies(), {
//       cookieName: "sid",
//       password: env.COOKIE_SECRET,
//     });

//     if(clientSession.did) {
//       logger.info("Destroying existing session here. ")
//       await clientSession.destroy()
//     }

//     clientSession.did = session.did;
//     await clientSession.save();
    
//     logger.info("Session save hudei: ", clientSession.did)
//     return NextResponse.redirect(new URL("/profile", request.url));
//   } catch (err) {
//     logger.error({ err }, "oauth callback failed");
//     return NextResponse.redirect(new URL("/?error", request.url));
//   }
// }

// app/api/oauth/callback/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { initializeContext } from "@/lib/context/server";
import { cookies } from "next/headers";
import {logger} from "@/lib/logger";
import { Session, sessionOptions } from "@/lib/sessionOptions";
import { getSession } from "@/lib/auth/agent";


export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const { oauthClient } = await initializeContext();

  try {
    const { session } = await oauthClient.callback(params);
    const cookieStore = await cookies();

    const clientSession = await getSession();

    // Clear previous if exists
    if (clientSession.did) {
      await clientSession.destroy();
    }

    // Save the new session
    clientSession.did = session.did;
    await clientSession.save();

    const sesh = await getSession();
    console.log("After Sessionn Saved: ", sesh.did);

    return NextResponse.redirect(new URL("/profile", request.url));
  } catch (err) {
    logger.error({ err }, "OAuth callback failed");
    return NextResponse.redirect(new URL("/?error", request.url));
  }
}
