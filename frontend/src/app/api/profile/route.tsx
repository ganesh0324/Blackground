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

        const {data: feedData } = await agent.app.bsky.feed.getAuthorFeed({
            actor: clientSession.did,
            limit: 10,
        });
        // logger.info("Feed data:", feedData.feed[0].post.embed?.$type);
        const posts = feedData.feed
      .filter((item: any) => item.post)
      .map((item: any) => {
        const post = item.post;
        const embed = post.embed;
        let image: { url: string; alt: string } | null = null;
        if (embed?.$type === "app.bsky.embed.images#view" && embed.images.length > 0) {
            logger.info("Image data:", embed.images[0]);
          image = {
            url: embed.images[0].thumb,
            alt: embed.images[0].alt ?? "",
          };
        }

        return {
          id: post.uri,
          content: post.record.text,
          handle: user.handle,
          avatar: user.avatar,
          displayName: user.name,
          createdAt: post.record.createdAt,
          image,
          likes : 0,
          comments : 0, 
          shares : 0
        };
      });
        return NextResponse.json({user, posts})
    } catch (err) {
        console.error("Error fetching profile:", err)
        return new NextResponse("Error fetching profile", { status: 500 })
    }
}