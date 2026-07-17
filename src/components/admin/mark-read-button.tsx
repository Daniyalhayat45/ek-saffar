"use client";

import { useTransition } from "react";
import { Check } from "lucide-react";

export function MarkReadButton({
  id,
  action,
}: {
  id: number;
  action: (id: number) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => action(id))}
      className="flex items-center gap-1.5 rounded-full border border-parchment/15 px-3 py-1.5 text-xs font-medium text-parchment transition-colors hover:border-orange hover:text-orange disabled:opacity-60"
    >
      <Check className="h-3.5 w-3.5" /> Mark read
    </button>
  );
}
