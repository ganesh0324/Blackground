import { IncomingMessage, ServerResponse } from "node:http";
import { getAppContext } from "../context/server";
import { getIronSession } from "iron-session";
import { env } from "@/lib/env";
import { Agent } from "@atproto/api";
import { cookies } from "next/headers";



export type Session = { did: string };

export async function getSessionAgent() {
  const ctx = getAppContext();
    const session = await getIronSession<Session>(cookies(), {
        cookieName: "sid",
        password: env.COOKIE_SECRET,
    });
    if (!session.did) return null
    try {
      const oauthSession = await ctx.oauthClient.restore(session.did)
      return oauthSession ? new Agent(oauthSession) : null
    } catch (err) {
      ctx.logger.warn({ err }, 'oauth restore failed')
      await session.destroy()
      return null
    }
}
