"use client";

import { LogOut } from "lucide-react";

export function SignOutButton({ compact = false }: { compact?: boolean }) {
  async function handleSignOut() {
    const { signOut } = await import("next-auth/react");
    await signOut({ callbackUrl: "/admin/login" });
  }

  if (compact) {
    return (
      <button onClick={handleSignOut} aria-label="Sign out" className="text-fog hover:text-orange">
        <LogOut className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-fog transition-colors hover:bg-basecamp hover:text-orange"
    >
      <LogOut className="h-4 w-4" /> Sign out
    </button>
  );
}
