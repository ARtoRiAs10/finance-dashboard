import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(
  (auth, req) => {
    // ✅ Temporary debug logs
    console.log(
      "[DEBUG] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:",
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    );
    console.log("[DEBUG] CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);

    if (isProtectedRoute(req)) auth().protect();

    return NextResponse.next();
  },
  {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!,
  }
);

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
