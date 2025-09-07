import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

const getBaseURL = () => process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const serverClient = hc<AppType>(getBaseURL(), {
  fetch: async (input: string | Request | URL, init: RequestInit | undefined) => {
    const { auth } = await import("@clerk/nextjs/server");
    const { getToken } = auth();
    const token = (await getToken({ template: "default" })) || "";

    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});
