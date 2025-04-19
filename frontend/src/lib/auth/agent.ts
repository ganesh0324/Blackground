"use server";

import { User } from "@/app/functions/create-user";
import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "../sessionOptions";

export type Session = {
  user: User | null;
};

const getSession = async (): Promise<IronSession<Session>> => {
  return await getIronSession<Session>(cookies(), sessionOptions);
};

export default getSession;
