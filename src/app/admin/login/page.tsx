"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

function LoginForm() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-basecamp px-5">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Image src="/images/logo.png" alt={siteConfig.name} width={48} height={48} />
          <h1 className="mt-4 font-display text-2xl font-semibold text-parchment">Admin Login</h1>
          <p className="mt-1 text-sm text-fog">{siteConfig.name} back office</p>
        </div>

        <ClientSignInForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          error={error}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
          callbackUrl={params.get("callbackUrl") || "/admin"}
        />
      </div>
    </div>
  );
}

function ClientSignInForm(props: {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  error: string;
  setError: (v: string) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  callbackUrl: string;
}) {
  const { email, password, setEmail, setPassword, error, setError, loading, setLoading, callbackUrl } = props;
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { signIn } = await import("next-auth/react");
    const result = await signIn("credentials", { email, password, redirect: false, callbackUrl });
    setLoading(false);
    if (result?.error) {
      setError("Incorrect email or password.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <div>
        <label className="text-xs font-medium text-fog">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-parchment/15 bg-basecamp-2 px-4 py-2.5 text-sm text-parchment focus:border-orange focus:outline-none"
          placeholder="admin@eksafar.com"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-fog">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-parchment/15 bg-basecamp-2 px-4 py-2.5 text-sm text-parchment focus:border-orange focus:outline-none"
          placeholder="••••••••"
        />
      </div>
      {error && (
        <p className="rounded-lg border border-orange/30 bg-orange/10 px-4 py-2.5 text-sm text-orange">{error}</p>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        <LogIn className="h-4 w-4" /> {loading ? "Signing in…" : "Sign In"}
      </Button>
      <p className="text-center text-xs text-fog">
        No account yet? Run <code className="text-parchment">npm run seed:admin</code> to create one.
      </p>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
