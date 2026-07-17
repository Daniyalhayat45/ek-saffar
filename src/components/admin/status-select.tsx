"use client";

import { useTransition } from "react";

const statuses = ["new", "contacted", "confirmed", "archived"];

export function StatusSelect({
  id,
  status,
  action,
}: {
  id: number;
  status: string;
  action: (id: number, status: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => action(id, e.target.value))}
      className="rounded-full border border-parchment/15 bg-basecamp px-3 py-1.5 text-xs font-medium text-parchment focus:border-orange focus:outline-none disabled:opacity-60"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}
