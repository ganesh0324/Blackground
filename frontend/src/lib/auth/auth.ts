import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { Agent } from "@atproto/api";
import { env } from "@/app/_lib/env";

type Session = { did: string };

export const sessionOptions = {
  cookieName: "sid",
  password: env.COOKIE_SECRET,
};

export async function getSession() {
  const session = await getIronSession<Session>(cookies(), sessionOptions);
  return session;
}

export async function getSessionAgent(oauthClient: any) {
  const session = await getSession();

  if (!session.did) return null;

  try {
    const oauthSession = await oauthClient.restore(session.did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    console.warn({ err }, "oauth restore failed");
    session.destroy();
    return null;
  }
}
