import { NextRequest, NextResponse } from 'next/server'
import { getSession, getSessionAgent } from '@/lib/auth/agent'

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    const form = await req.formData();
    const text = form.get('text') as string | null;
    const imageFile = form.get('image') as File | null;


    if (!text || text.trim() === '') {
        return NextResponse.json({ error: 'Empty post' }, { status: 400 })
    }

    const agent = await getSessionAgent()
    const session = await getSession();
    if (!agent) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let embed = undefined;

    if (imageFile) {
        try {
            // Upload the image to the Bluesky PDS

            const arrayBuffer = await imageFile.arrayBuffer();
            const imageArray = new Uint8Array(arrayBuffer);

            const uploadResult = await agent.com.atproto.repo.uploadBlob(imageArray, {
                encoding: imageFile.type
            });
            embed = {
                $type: 'app.bsky.embed.images',
                images: [
                    {
                        image: uploadResult.data.blob,
                        alt: 'An awesome image',
                    },
                ],
            };

        } catch (error) {
            console.error("Error uploading image to Bluesky PDS:", error);
            return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }
    }

    const res = await agent.app.bsky.feed.post.create({
        repo: session.did,
    },
        {
            text: text,
            createdAt: new Date().toISOString(),
            ...(embed && { embed }), 
        }
    )

    return NextResponse.json({ success: true, postUri: res.uri })
}