import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/agent";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest, response: NextResponse) {
  // const agent = await getSessionAgent();
  const clientSession = await getSession();
  console.log("Session: ", clientSession);

  logger.info("Session as from Client: ", clientSession);

  try {
    // const { data: profileRecord } = await agent.com.atproto.repo.getRecord({
    //     repo: agent.assertDid,
    //     collection: "app.bsky.actor.profile",
    //     rkey: "self",
    // })

    // Safely extract the displayName
    // const displayName = profileRecord.value?.displayName

    return Response.json({ name: "Alex" });
  } catch (err) {
    console.error("Error fetching profile:", err);
    return new Response("Error fetching profile", { status: 500 });
  }
}
