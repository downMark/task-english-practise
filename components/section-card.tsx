import type { ReactNode } from "react";

export function SectionCard({
  title,
  eyebrow,
  children,
  actions,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-border bg-white/90 p-5 shadow-card sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">{eyebrow}</p> : null}
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h2>
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
