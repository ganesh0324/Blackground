import { IncomingMessage, ServerResponse } from "node:http";
import { AppContext } from "../context/server";
import { getIronSession } from "iron-session";
import { env } from "@/app/_lib/env";
import { Agent } from "@atproto/api";

export type Session = { did: string };

export async function getSessionAgent(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  ctx: AppContext,
) {
  const session = await getIronSession<Session>(req, res, {
    cookieName: "sid",
    password: env.COOKIE_SECRET,
  });
  if (!session.did) return null;
  try {
    const oauthSession = await ctx.oauthClient.restore(session.did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    ctx.logger.warn({ err }, "oauth restore failed");
    session.destroy();
    return null;
  }
}
