import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { shell } from "./shell";
import { html } from "../lib/view";

export function profile_page(props: Props) {
    return shell({
        title: 'Profile',
        content: content(props),
    })
}

type Props = {
    profile: { displayName?: string }
}

function content({ profile }: Props) {
    return html`<div id="root">
        <div class="error"></div>
        <div id="header">
            <h1>This is ${profile.displayName}'s profile page</h1>
        </div>
    </div>`
}