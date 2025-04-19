"use server"

import { IncomingMessage, ServerResponse } from "node:http";
import { initializeContext } from "../context/server";
import { getIronSession } from "iron-session";
import { Agent } from "@atproto/api";
import { cookies } from "next/headers";
import { logger } from "@/lib/logger"
import { sessionOptions, Session } from "../sessionOptions";


export async function getSession() {
  var session = await getIronSession<Session>(cookies(), sessionOptions);
  return session;
}

export async function getSessionAgent() {
  const ctx = await initializeContext();

  const session = await getSession();

  if (!session.did) {
    logger.error("SESSION NOT FOUND")
    return null;
  }

  try {
    const oauthSession = await ctx.oauthClient.restore(session.did)
    return oauthSession ? new Agent(oauthSession) : null
  } catch (err) {
    logger.warn({ err }, 'oauth restore failed')
    await session.destroy()
    return null
  }
}
