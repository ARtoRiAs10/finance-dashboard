import { Hono } from "hono";
import { handle } from "hono/vercel";
import { clerkMiddleware } from "@hono/clerk-auth";
import { cors } from "hono/cors";

// Import your route handlers
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

// Add CORS middleware for Codespaces
app.use("*", cors({
  origin: [
    "http://localhost:3000",
    "https://*.app.github.dev", // Allow all Codespace URLs
    "https://finance-dashboard-backend.vercel.app", // backend
    "https://finance-dashboard-ygyi.vercel.app",
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Apply Clerk middleware
app.use("*", clerkMiddleware());

// Mount routes
const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/summary", summary);

// Export HTTP method handlers
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app); // Important for CORS

export type AppType = typeof routes;
