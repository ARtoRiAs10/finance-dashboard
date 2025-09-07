import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);