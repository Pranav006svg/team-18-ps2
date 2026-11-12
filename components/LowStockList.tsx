"use client";

import { StockBadges } from "./Badges";

export type LowItem = {
  sku: string;
  name: string;
  category: string;
  stock_qty: number;
  reorder_level: number;
  days_left: number | null;
  supplier_name: string;
  at_risk: boolean;
  already_on_order: number | null;
};

/** Live list of the most urgent low-stock items (data comes from the dashboard page). */
export default function LowStockList({ items, error }: { items: LowItem[] | null; error: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="font-semibold">Low stock</h2>
        <p className="text-xs text-slate-500">Most urgent first. Updates live.</p>
      </div>
      <ul className="divide-y divide-slate-100">
        {error && <li className="p-4 text-sm text-red-600">{error}</li>}
        {!error && items?.length === 0 && <li className="p-4 text-sm text-slate-500">Nothing is low.</li>}
        {items?.map((i) => (
          <li key={i.sku} className="px-4 py-2.5 text-sm">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">{i.name}</p>
              <p className="shrink-0 text-xs text-slate-500">{i.days_left ?? "-"} days left</p>
            </div>
            <p className="text-xs text-slate-500">
              {i.stock_qty} in stock (level {i.reorder_level}) · {i.supplier_name}
            </p>
            <div className="mt-1 flex flex-wrap gap-1">
              <StockBadges low atRisk={i.at_risk} poId={i.already_on_order} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
