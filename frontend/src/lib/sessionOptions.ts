import { env } from "./env";

export type Session = { did: string };

export const sessionOptions = {
  cookieName: "sid",
  password: env.COOKIE_SECRET,
  cookieOptions: {
    secure: false,
    sameSite: "lax",
    httpOnly: true,
    path: "/",
  },
};
