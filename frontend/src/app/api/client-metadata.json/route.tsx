import { getAppContext } from "@/lib/context/server";
import { NextResponse } from "next/server";

const { oauthClient } = getAppContext();

export async function GET() {
  return NextResponse.json(oauthClient.clientMetadata, { status: 200 });
}
