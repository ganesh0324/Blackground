import { pino } from "pino";
import type { OAuthClient } from "@atproto/oauth-client-node";
import { Firehose } from "@atproto/sync";

import { createDb, Database, migrateToLatest } from "../../app/_lib/db";
import { env } from "../../app/_lib/env";
import { createIngester } from "./ingester";
import { createClient } from "../auth/client";
import {
  BidirectionalResolver,
  createIdResolver,
  createBidirectionalResolver,
} from "./resolver";

export type AppContext = {
  db: Database;
  ingester: Firehose;
  logger: pino.Logger;
  oauthClient: OAuthClient;
  resolver: BidirectionalResolver;
};

let globalContext: AppContext | undefined;

// Function to initialise server context
export async function initialiseServer() {
  if (globalContext) return globalContext;

  const db = createDb(env.DB_PATH);
  migrateToLatest(db);

  const oauthClient = await createClient(db);
  const baseIdResolver = createIdResolver();
  const ingester = createIngester(db, baseIdResolver);
  const resolver = createBidirectionalResolver(baseIdResolver);
  const logger = pino({ name: "server start" });

  const ctx: AppContext = {
    db,
    ingester,
    logger,
    resolver,
    oauthClient,
  };
  // ingester.start();
  logger.info(`Server initialised in ${env.NODE_ENV} environent`);

  globalContext = ctx;

  return ctx;
}

// Function to get global server context
export async function getContext() {
  if (!globalContext) {
    return await initialiseServer();
  }
  return globalContext;
}

// Function to remove server context
export async function closeServer() {
  if (globalContext) {
    const { ingester, logger } = globalContext;
    // await ingester.destroy();
    logger.info("server closed");
  }
}
