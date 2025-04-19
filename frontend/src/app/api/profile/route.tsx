import { NextRequest, NextResponse } from "next/server";
import { getSession, getSessionAgent } from "@/lib/auth/agent";
import { logger } from "@/lib/logger";
import { cookies } from "next/headers";
import { createUser } from "@/app/functions/create-user";


export async function GET(req: NextRequest) {
    const clientSession = await getSession();
    const agent = await getSessionAgent();

    if (!agent) {
        logger.error("AGENT BHETINA YAR!")
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const { data: profileRecord } = await agent.getProfile({
            actor: clientSession.did
        })

        // It is showing display name is not found, shall find a way to remove this error
        const user = createUser(profileRecord);

        return Response.json(user)
    } catch (err) {
        console.error("Error fetching profile:", err)
        return new Response("Error fetching profile", { status: 500 })
    }
}