"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Practice", emoji: "Aa" },
  { href: "/reading", label: "Daily Reading", emoji: "Rd" },
  { href: "/listening", label: "Listening", emoji: "Au" },
  { href: "/progress", label: "Progress", emoji: "Pg" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Learning Hub</p>
            <h1 className="mt-1 text-xl font-semibold text-slate-900">English Practice</h1>
          </div>
          <p className="hidden max-w-xl text-sm text-slate-500 md:block">
            Click a task to listen and move over words to see Chinese meanings.
          </p>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 lg:w-72">
          <div className="rounded-3xl border border-border bg-white/90 p-4 shadow-card">
            <div className="mb-6 rounded-2xl bg-accent px-4 py-5 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-100">Level</p>
              <p className="mt-1 text-2xl font-semibold">Intermediate</p>
              <p className="mt-2 text-sm text-teal-50">A calm, focused space for reading, listening, and steady practice.</p>
            </div>
            <nav className="space-y-2">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                      active
                        ? "bg-accentSoft text-accent shadow-sm ring-1 ring-accent/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold uppercase">
                      {item.emoji}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 rounded-2xl bg-slate-900 p-4 text-sm text-slate-200">
              <p className="font-semibold text-white">This week</p>
              <p className="mt-2 leading-6 text-slate-300">
                Keep the loop simple: choose a task, play the passage, hover unfamiliar words, then review your progress.
              </p>
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
