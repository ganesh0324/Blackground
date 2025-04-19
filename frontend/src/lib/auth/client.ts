import {
  NodeOAuthClient,
  NodeSavedState,
  NodeSavedStateStore,
  NodeSavedSession,
  NodeSavedSessionStore,
  OAuthClientMetadataInput,
} from "@atproto/oauth-client-node";
import type { Database } from "../db";
import { env } from "../env";

// storage.ts
export class StateStore implements NodeSavedStateStore {
  constructor(private db: Database) {}
  async get(key: string): Promise<NodeSavedState | undefined> {
    const result = await this.db
      .selectFrom("auth_state")
      .selectAll()
      .where("key", "=", key)
      .executeTakeFirst();
    if (!result) return;
    return JSON.parse(result.state) as NodeSavedState;
  }
  async set(key: string, val: NodeSavedState) {
    const state = JSON.stringify(val);
    await this.db
      .insertInto("auth_state")
      .values({ key, state })
      .onConflict((oc) => oc.doUpdateSet({ state }))
      .execute();
  }
  async del(key: string) {
    await this.db.deleteFrom("auth_state").where("key", "=", key).execute();
  }
}

export class SessionStore implements NodeSavedSessionStore {
  constructor(private db: Database) {}
  async get(key: string): Promise<NodeSavedSession | undefined> {
    const result = await this.db
      .selectFrom("auth_session")
      .selectAll()
      .where("key", "=", key)
      .executeTakeFirst();
    if (!result) return;
    return JSON.parse(result.session) as NodeSavedSession;
  }
  async set(key: string, val: NodeSavedSession) {
    const session = JSON.stringify(val);
    await this.db
      .insertInto("auth_session")
      .values({ key, session })
      .onConflict((oc) => oc.doUpdateSet({ session }))
      .execute();
  }
  async del(key: string) {
    await this.db.deleteFrom("auth_session").where("key", "=", key).execute();
  }
}

export function getClientMetadata(): OAuthClientMetadataInput {
  const baseUrl: string = env.PUBLIC_URL;
  return {
    client_name: "BlackGround",
    client_id: `${baseUrl}/client-metadata.json`,
    client_uri: `${baseUrl}`,
    redirect_uris: [`${baseUrl}/oauth/callback`],
    scope: "atproto transition:generic",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    application_type: "web",
    token_endpoint_auth_method: "none",
    dpop_bound_access_tokens: true,
  };
}

// client.ts
export const createClient = async (db: Database) => {
  return new NodeOAuthClient({
    clientMetadata: getClientMetadata(),
    stateStore: new StateStore(db),
    sessionStore: new SessionStore(db),
  });
};
