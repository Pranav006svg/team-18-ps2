"use client";

import { useState } from "react";
import AgentChat from "@/components/AgentChat";
import LowStockList, { type LowItem } from "@/components/LowStockList";
import { useLiveData } from "@/components/useLiveData";
import { formatRs } from "@/lib/format";

type Dashboard = {
  low_stock_count: number;
  reorder_value: number;
  at_risk_count: number;
  open_po_count: number;
  open_po_value: number;
  low_items: LowItem[];
};

/* DASHBOARD: stat cards, agent chat and the live low-stock list. */
export default function HomePage() {
  // Changes every time the agent writes data, so everything reloads at once.
  const [refreshKey, setRefreshKey] = useState(0);
  const { data, error } = useLiveData<Dashboard>("/api/dashboard", refreshKey);

  const cards = [
    { label: "Low stock items", value: data ? String(data.low_stock_count) : "-" },
    { label: "Reorder value needed", value: data ? formatRs(data.reorder_value) : "-" },
    { label: "At risk before delivery", value: data ? String(data.at_risk_count) : "-" },
    {
      label: "Open POs",
      value: data ? `${data.open_po_count} · ${formatRs(data.open_po_value)}` : "-",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-4 p-4 md:p-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">{c.label}</p>
            <p className="mt-1 break-words text-lg font-semibold">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        <section className="md:col-span-3">
          <AgentChat onDataChanged={() => setRefreshKey((k) => k + 1)} />
        </section>
        <section className="md:col-span-2">
          <LowStockList items={data?.low_items ?? null} error={error} />
        </section>
      </div>
    </main>
  );
}
