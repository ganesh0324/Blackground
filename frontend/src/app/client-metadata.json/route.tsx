import { getClientMetadata } from "@/lib/auth/client";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(getClientMetadata(), {
    status: 200,
  });
}
