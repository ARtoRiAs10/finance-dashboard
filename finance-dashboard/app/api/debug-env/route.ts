import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      ? "✅ set"
      : "❌ missing",
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? "✅ set" : "❌ missing",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "❌ missing",
  });
}
