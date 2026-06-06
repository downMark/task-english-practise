"use client";

import { listeningItems, practiceTasks, readingArticles } from "@/data/content";
import { SectionCard } from "@/components/section-card";
import { ActivityHeatmap } from "@/components/progress-helpers";
import { useLearningState } from "@/hooks/use-learning-state";

function StatCard({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <div className="rounded-[24px] border border-border bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{note}</p>
    </div>
  );
}

export default function ProgressPage() {
  const { snapshot } = useLearningState();
  const allEvents = [...snapshot.practiceHistory, ...snapshot.readingHistory, ...snapshot.listeningHistory].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );

  const totalSessions =
    snapshot.practiceHistory.length + snapshot.readingHistory.length + snapshot.listeningHistory.length;

  return (
    <div className="space-y-6">
      <SectionCard
        eyebrow="Progress"
        title="Keep the momentum visible and easy to understand"
        actions={
          <div className="rounded-full bg-accentSoft px-4 py-2 text-sm font-medium text-accent">
            Current streak: {snapshot.streakDays} days
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Tasks Started" value={snapshot.startedTaskIds.length} note={`Out of ${practiceTasks.length} practice tasks`} />
          <StatCard label="Reading Done" value={snapshot.completedReadingIds.length} note={`Out of ${readingArticles.length} articles`} />
          <StatCard label="Listening Played" value={snapshot.listeningItemIds.length} note={`Out of ${listeningItems.length} audio items`} />
          <StatCard label="Total Sessions" value={totalSessions} note="Practice, reading, and listening combined" />
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard eyebrow="Recent Activity" title="Two-week learning rhythm">
          <ActivityHeatmap events={allEvents} />
        </SectionCard>

        <SectionCard eyebrow="Latest Sessions" title="What you touched most recently">
          <div className="space-y-3">
            {allEvents.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-border bg-slate-50 p-5 text-sm text-slate-500">
                No activity yet. Start a practice task or play a listening item to populate this panel.
              </div>
            ) : (
              allEvents.slice(0, 6).map((event) => (
                <div key={`${event.type}-${event.id}-${event.date}`} className="rounded-[24px] border border-border bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{event.type}</p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{event.title}</h3>
                    </div>
                    <span className="text-sm text-slate-500">{event.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
