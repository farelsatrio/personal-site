import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authenticated = await isAuthenticated(request);
  return NextResponse.json({ success: true, authenticated });
}
