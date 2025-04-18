// lib/server.ts

import { pino } from "pino";
import type { OAuthClient } from "@atproto/oauth-client-node";
import { Firehose } from "@atproto/sync";
import { createDb, Database, migrateToLatest } from "../db";
import { env } from "../env";
import { createIngester } from "./ingester";
import { createClient } from "../auth/client";
import {
  BidirectionalResolver,
  createIdResolver,
  createBidirectionalResolver,
} from "./resolver";

export type AppContextType = {
  db: Database;
  ingester: Firehose;
  logger: pino.Logger;
  oauthClient: OAuthClient;
  resolver: BidirectionalResolver;
};

let appContext: AppContextType | null = null;

export async function initializeContext(): Promise<AppContextType> {
  if (appContext) return appContext;

  const logger = pino({ name: "server start" });
  logger.info("Initializing server...");

  const db = createDb(env.DB_PATH);
  migrateToLatest(db);

  const oauthClient = await createClient(db);

  const baseIdResolver = createIdResolver();
  const resolver = createBidirectionalResolver(baseIdResolver);
  const ingester = createIngester(db, baseIdResolver);

  appContext = {
    db,
    ingester,
    logger,
    oauthClient,
    resolver,
  };

  logger.info("Server initialized 🎉");

  return appContext;
}

// Safe accessor
export function getAppContext(): AppContextType {
  if (!appContext) {
    throw new Error("AppContext not initialized. Did you forget to call initializeContext()?");
  }
  return appContext;
}
