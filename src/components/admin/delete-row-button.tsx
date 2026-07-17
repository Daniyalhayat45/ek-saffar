"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function DeleteRowButton({
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
      onClick={() => {
        if (confirm("Delete this entry? This cannot be undone.")) {
          startTransition(() => action(id));
        }
      }}
      aria-label="Delete"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-parchment/15 text-fog transition-colors hover:border-orange hover:text-orange disabled:opacity-60"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}
