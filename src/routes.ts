import assert from 'node:assert'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { OAuthResolverError } from '@atproto/oauth-client-node'
import { isValidHandle } from '@atproto/syntax'
import { TID } from '@atproto/common'
import { Agent } from '@atproto/api'
import express from 'express'
import { getIronSession } from 'iron-session'
import type { AppContext } from '#/index'
import { home } from '#/pages/home'
import { login } from '#/pages/login'
import { env } from '#/lib/env'
import { page } from '#/lib/view'
import * as Status from '#/lexicon/types/xyz/statusphere/status'
import * as Profile from '#/lexicon/types/app/bsky/actor/profile'
import { profile } from 'node:console'
import { profile_page } from './pages/profile'
import { ProfileView } from '@atproto/api/dist/client/types/app/bsky/actor/defs'

type Session = { did: string }

export type displayNameMap = Record<string, string>; //display name map ko lagi type

// Helper function for defining routes
const handler =
  (fn: express.Handler) =>
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        await fn(req, res, next)
      } catch (err) {
        next(err)
      }
    }

// Helper function to get the Atproto Agent for the active session
async function getSessionAgent(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  ctx: AppContext
) {
  const session = await getIronSession<Session>(req, res, {
    cookieName: 'sid',
    password: env.COOKIE_SECRET,
  })
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

export const createRouter = (ctx: AppContext) => {
  const router = express.Router()

  // Static assets
  router.use('/public', express.static(path.join(__dirname, 'pages', 'public')))

  // OAuth metadata
  router.get(
    '/client-metadata.json',
    handler((_req, res) => {
      return res.json(ctx.oauthClient.clientMetadata)
    })
  )

  // OAuth callback to complete session creation
  router.get(
    '/oauth/callback',
    handler(async (req, res) => {
      const params = new URLSearchParams(req.originalUrl.split('?')[1])
      try {
        const { session } = await ctx.oauthClient.callback(params)
        const clientSession = await getIronSession<Session>(req, res, {
          cookieName: 'sid',
          password: env.COOKIE_SECRET,
        })
        // assert(!clientSession.did, 'session already exists')
        clientSession.did = session.did
        await clientSession.save()
      } catch (err) {
        ctx.logger.error({ err }, 'oauth callback failed')
        return res.redirect('/?error')
      }
      return res.redirect('/')
    })
  )

  // Login page
  router.get(
    '/login',
    handler(async (_req, res) => {
      return res.type('html').send(page(login({})))
    })
  )

  // Login handler
  router.post(
    '/login',
    handler(async (req, res) => {
      // Validate
      const handle = req.body?.handle
      if (typeof handle !== 'string' || !isValidHandle(handle)) {
        return res.type('html').send(page(login({ error: 'invalid handle' })))
      }

      // Initiate the OAuth flow
      try {
        const url = await ctx.oauthClient.authorize(handle, {
          scope: 'atproto transition:generic',
        })
        return res.redirect(url.toString())
      } catch (err) {
        ctx.logger.error({ err }, 'oauth authorize failed')
        return res.type('html').send(
          page(
            login({
              error:
                err instanceof OAuthResolverError
                  ? err.message
                  : "couldn't initiate login",
            })
          )
        )
      }
    })
  )

  // Logout handler
  router.post(
    '/logout',
    handler(async (req, res) => {
      const session = await getIronSession<Session>(req, res, {
        cookieName: 'sid',
        password: env.COOKIE_SECRET,
      })
      await session.destroy()
      return res.redirect('/')
    })
  )

  // Homepage
  router.get(
    '/',
    handler(async (req, res) => {
      console.log("In the main page")
      console.log("Getting session agent in home page")
      // If the user is signed in, get an agent which communicates with their server
      const agent = await getSessionAgent(req, res, ctx)


      console.log("Fetcing data from database in home page")
      // Fetch data stored in our SQLite
      const statuses = await ctx.db
        .selectFrom('status')
        .selectAll()
        .orderBy('indexedAt', 'desc')
        .limit(10)
        .execute()
      const myStatus = agent
        ? await ctx.db
          .selectFrom('status')
          .selectAll()
          .where('authorDid', '=', agent.assertDid)
          .orderBy('indexedAt', 'desc')
          .executeTakeFirst()
        : undefined

      console.log("resolving dids in home page")
      // Map user DIDs to their domain-name handles
      const didHandleMap = await ctx.resolver.resolveDidsToHandles(
        statuses.map((s) => s.authorDid)
      )

      const displayNameMap: Record<string, string> = {}
      if (!agent) {
        console.log("serving the logged out view in home page")
        // Serve the logged-out view
        return res.type('html').send(page(home({ statuses, didHandleMap, displayNameMap })))
      }

      console.log("Fetching the profile in home page")
      // Fetch additional information about the logged-in user
      const { data: profileRecord } = await agent.com.atproto.repo.getRecord({
        repo: agent.assertDid,
        collection: 'app.bsky.actor.profile',
        rkey: 'self',
      })



      const profile =
        Profile.isRecord(profileRecord.value) &&
          Profile.validateRecord(profileRecord.value).success
          ? profileRecord.value
          : {}

      // Resolve display names for statuses
      for (const status of statuses) {
        try {
          const { data: profileRecord } = await agent.com.atproto.repo.getRecord({
            repo: status.authorDid,
            collection: 'app.bsky.actor.profile',
            rkey: 'self',
          });
          displayNameMap[status.authorDid] =
            profileRecord.value?.displayName; // Fallback to DID if no display name
        }
        catch (err) {
          console.error(`Failed to fetch profile for DID ${status.authorDid}:`, err);
          displayNameMap[status.authorDid] = status.authorDid;
        }
      }

      console.log("Fetching the followers in home page")
      //get the followers of the user
      const followers_res = await agent.app.bsky.graph.getFollowers({
        actor: agent.assertDid,
        limit: 100,
      })

      const followers = followers_res.data.followers
      // console.log(followers)

      // Serve the logged-in view
      return res.type('html').send(
        page(
          home({
            statuses,
            didHandleMap,
            profile,
            myStatus,
            displayNameMap,
            followers
          })
        )

      )
    })
  )

  // //fetching followers
  // router.get('/followers', async (req, res) => {
  //   try {
  //     // Get authenticated user session
  //     const agent = await getSessionAgent(req, res, ctx);

  //     const reponse = agent?.com.atproto.repo.getRecord({
  //       repo: agent.assertDid,
  //       collection: 'app.bsky.graph.follow',
  //       rkey : 
  //     })

  //     // Fetch followers using ATProto API
  //     const response = await agent.api.app.bsky.graph.getFollowers({
  //       actor: agent.session.did, // DID of the logged-in user
  //       limit: 100,
  //     });

  //     // Resolve display names for followers
  //     const followers = await Promise.all(
  //       response.data.followers.map(async (follower) => {
  //         const profile = await agent.api.app.bsky.actor.getProfile({
  //           actor: follower.did,
  //         });
  //         return {
  //           did: follower.did,
  //           handle: follower.handle,
  //           displayName: profile.data.displayName || follower.handle,
  //         };
  //       })
  //     );

  //     // Render followers page
  //     res.render('followers', { followers });
  //   } catch (err) {
  //     console.error('Error fetching followers:', err);
  //     res.status(500).send('Failed to load followers');
  //   }
  // });

  router.get(
    '/profile/:did',
    handler(async (req, res) => {
      console.log("I'm in the profile handler")
      // If the user is signed in, get an agent which communicates with their server

      const agent = await getSessionAgent(req, res, ctx)
      if (!req.params) {
        return res.status(400).send('Missing DID');
      }

      const { did } = req.params; // Extract DID from path
      console.log("The received did is: ", did)

      const profileDid: string = did.toString();
      if (!profileDid) {
        return res.status(400).send('Missing DID');
      }


      // Fetch the profile using the proper API endpoint
      const profileResponse = await agent.app.bsky.actor.getProfile({
        actor: profileDid
      });
      const profile = profileResponse.data;


      const response = await agent.app.bsky.feed.getAuthorFeed({
        actor: profileDid, // The user's DID
        limit: 10
      });
      const feed = response.data.feed;
      // feed.forEach((post, i) => {
      //   console.log("Post Number: ", i + 1, post.post.record.text);
      // });


      res.type('html').send(
        page(
          profile_page({ profile, posts: feed }))
      );
    }))

  // "Set status" handler
  router.post(
    '/status',
    handler(async (req, res) => {
      // If the user is signed in, get an agent which communicates with their server
      const agent = await getSessionAgent(req, res, ctx)
      if (!agent) {
        return res
          .status(401)
          .type('html')
          .send('<h1>Error: Session required</h1>')
      }

      // Construct & validate their status record
      const rkey = TID.nextStr()
      const record = {
        $type: 'xyz.statusphere.status',
        status: req.body?.status,
        createdAt: new Date().toISOString(),
      }
      if (!Status.validateRecord(record).success) {
        return res
          .status(400)
          .type('html')
          .send('<h1>Error: Invalid status</h1>')
      }

      let uri
      try {
        // Write the status record to the user's repository
        const res = await agent.com.atproto.repo.putRecord({
          repo: agent.assertDid,
          collection: 'xyz.statusphere.status',
          rkey,
          record,
          validate: false,
        })
        uri = res.data.uri
      } catch (err) {
        ctx.logger.warn({ err }, 'failed to write record')
        return res
          .status(500)
          .type('html')
          .send('<h1>Error: Failed to write record</h1>')
      }

      try {
        // Optimistically update our SQLite
        // This isn't strictly necessary because the write event will be
        // handled in #/firehose/ingestor.ts, but it ensures that future reads
        // will be up-to-date after this method finishes.
        await ctx.db
          .insertInto('status')
          .values({
            uri,
            authorDid: agent.assertDid,
            status: record.status,
            createdAt: record.createdAt,
            indexedAt: new Date().toISOString(),
          })
          .execute()
      } catch (err) {
        ctx.logger.warn(
          { err },
          'failed to update computed view; ignoring as it should be caught by the firehose'
        )
      }

      return res.redirect('/')
    })
  )

  return router
}
