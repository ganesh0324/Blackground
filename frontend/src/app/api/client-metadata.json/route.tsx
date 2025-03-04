import { getContext } from "@/lib/context/server";
import { NextResponse } from "next/server";

const { oauthClient } = await getContext();

export async function GET() {
  return NextResponse.json(oauthClient.clientMetadata, { status: 200 });
}
