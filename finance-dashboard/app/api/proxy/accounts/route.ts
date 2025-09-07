import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Forward request to your actual backend API
    const response = await fetch(`${BACKEND_URL}/api/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Failed to proxy request", error: error.message },
      { status: 500 }
    );
  }
}
