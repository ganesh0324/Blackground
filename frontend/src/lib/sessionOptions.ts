import { User } from "@/app/functions/create-user";
import { env } from "./env";

export type Session = { user: User };

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
