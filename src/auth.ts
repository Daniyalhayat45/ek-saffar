import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";

// Hardcoded admin login. Defaults below work out of the box; override them
// with ADMIN_EMAIL / ADMIN_PASSWORD environment variables if you want to
// change the credentials without editing code.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@admin.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "eksaffar2026!";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) return null;

        return { id: "1", name: "Ek Safar Admin", email: ADMIN_EMAIL };
      },
    }),
  ],
});
