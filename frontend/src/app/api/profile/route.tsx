import { NextRequest, NextResponse } from "next/server";
import { getSessionAgent } from "@/lib/auth/agent";

type Session = { did: string };

export async function GET(request: NextRequest, response: NextResponse) {
    const agent = await getSessionAgent();

    if (!agent) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const { data: profileRecord } = await agent.com.atproto.repo.getRecord({
            repo: agent.assertDid,
            collection: "app.bsky.actor.profile",
            rkey: "self",
        })

        // Safely extract the displayName
        const displayName = profileRecord.value?.displayName || "Dhireyy"

        return Response.json({ name: displayName })
    } catch (err) {
        console.error("Error fetching profile:", err)
        return new Response("Error fetching profile", { status: 500 })
    }
}