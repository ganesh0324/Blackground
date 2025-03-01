import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { shell } from "./shell";
import { html } from "../lib/view";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export function profile_page(props: Props) {
    return shell({
        title: 'Profile',
        content: content(props),
    })
}

type Props = {
    profile: ProfileView,
    posts?: FeedViewPost[]
}

function content({ profile, posts }: Props) {
    return html`
    <div id="root">
        <div class="error"></div>
        <div id="header">
            <div style="display: flex; justify-content: center; align-items: center;">
                <img src="/assets/blackground.png" alt="BlackGround" style="width: 200px; height: 200px;">
            </div>

            <div style="display:flex; justify-content: center; align-items: center;">
                <img src="${profile.avatar}" alt="Avatar" style="margin: 20px;width:200px;height:200px; object-fit : cover; border-radius: 50%;">
            </div>

            <h2>${profile.displayName}</h2>
            <h3>@${profile.handle}</h3>
            <p>${profile.description || ''}</p>
            <h2>Posts:</h2>
            ${posts ? html`<div id="posts">
                ${posts.map((post, i) => {
        return html`
                        <div class="post" style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                        <p style="text-align:left;"><b>${profile.displayName}</b>: ${post.post.record.text}</p>
                        </div>
                    `
    })}
                </div>` : ''}
        </div>
    </div>`
}