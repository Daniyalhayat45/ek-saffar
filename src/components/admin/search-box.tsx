"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export function AdminSearchBox({ placeholder, basePath }: { placeholder: string; basePath: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [, startTransition] = useTransition();

  function handleChange(next: string) {
    setValue(next);
    startTransition(() => {
      router.push(next ? `${basePath}?q=${encodeURIComponent(next)}` : basePath);
    });
  }

  return (
    <div className="flex max-w-md items-center gap-2 rounded-full border border-parchment/15 bg-basecamp-2 px-4 py-2.5">
      <Search className="h-4 w-4 shrink-0 text-fog" />
      <input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-parchment placeholder:text-fog focus:outline-none"
      />
      {value && (
        <button onClick={() => handleChange("")} aria-label="Clear search" className="text-fog hover:text-orange">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
