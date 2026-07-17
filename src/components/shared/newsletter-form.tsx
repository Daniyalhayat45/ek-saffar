"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "submitted">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("submitted");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "submitted") {
    return (
      <div className="mt-4 flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-4 py-2.5 text-sm text-orange">
        <Check className="h-4 w-4" /> Subscribed — welcome aboard.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center rounded-full border border-parchment/20 bg-basecamp pr-1.5 focus-within:border-orange">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-full bg-transparent px-4 py-2.5 text-sm text-parchment placeholder:text-fog focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange text-basecamp transition-transform hover:scale-105 disabled:opacity-60"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-orange">{error}</p>}
    </form>
  );
}
