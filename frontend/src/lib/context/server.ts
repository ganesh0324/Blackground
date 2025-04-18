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
import { logger } from "@/lib/logger"
export type AppContextType = {
  db: Database;
  ingester: Firehose;
  oauthClient: OAuthClient;
  resolver: BidirectionalResolver;
};

let appContext: AppContextType | null = null;

export async function initializeContext(): Promise<AppContextType> {
  if (appContext) {
    return appContext;
  }

  const db = createDb(env.DB_PATH);
  migrateToLatest(db);

  const oauthClient = await createClient(db);

  const baseIdResolver = createIdResolver();
  const resolver = createBidirectionalResolver(baseIdResolver);
  const ingester = createIngester(db, baseIdResolver);

  appContext = {
    db,
    ingester,
    oauthClient,
    resolver,
  };
  return appContext;
}