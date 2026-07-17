import type { NextAuthConfig } from "next-auth";

// Edge-safe config used by middleware. No providers with DB access here —
// the Postgres driver can't run in the Edge runtime. The credentials
// provider itself is added in `src/auth.ts`, which only runs in
// Node.js-based API routes and server components.
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized: async ({ auth }) => !!auth?.user,
  },
};
