"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/purchase-orders", label: "Purchase Orders" },
];

export default function NavBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/login")) return null;

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 md:px-6">
        <span className="text-sm font-semibold">StockPilot · FreshMart Velachery</span>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2 ${active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
              >
                {l.label}
              </Link>
            );
          })}
          <button onClick={logout} className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100">
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
