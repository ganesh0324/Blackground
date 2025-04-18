import { env } from "./env";

export type Session = { did: string };

export const sessionOptions = {
    cookieName: "sid",
    password: env.COOKIE_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production", // false in dev
      sameSite: "lax", // or "strict", but "lax" is safe
      httpOnly: true,  // keep this true!
      path: "/",       // crucial
    },
  };