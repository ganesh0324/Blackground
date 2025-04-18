import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/agent";
import { logger } from "@/lib/logger";


export async function GET(request: NextRequest, response: NextResponse) {
    // const agent = await getSessionAgent();
    const clientSession = await getSession();

    clientSession.did = "Dhireyy";
    await clientSession.save();

    const sesh = await getSession();
    logger.info("Session as from Client: ", sesh.did);

    try {
        // const { data: profileRecord } = await agent.com.atproto.repo.getRecord({
        //     repo: agent.assertDid,
        //     collection: "app.bsky.actor.profile",
        //     rkey: "self",
        // })

        // Safely extract the displayName
        // const displayName = profileRecord.value?.displayName || "Dhireyy"

        return Response.json({ name: "Dhireyy" })
    } catch (err) {
        console.error("Error fetching profile:", err)
        return new Response("Error fetching profile", { status: 500 })
    }
}