"use client";

import Link from "next/link";
import { listeningItems } from "@/data/content";
import { SectionCard } from "@/components/section-card";
import { useLearningState } from "@/hooks/use-learning-state";
import { useSpeechPlayer } from "@/hooks/use-speech-player";

const filters = ["All Audio", "Audio Stories", "Podcasts", "Daily News"];

export default function ListeningPage() {
  const { snapshot, recordListening } = useLearningState();
  const speech = useSpeechPlayer();

  return (
    <div className="space-y-6">
      <SectionCard
        eyebrow="Listening Center"
        title="Immerse yourself in natural phrasing and consistent repetition"
        actions={
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
            {snapshot.listeningItemIds.length} items played
          </div>
        }
      >
        <div className="mb-6 flex gap-3 overflow-x-auto pb-1">
          {filters.map((filter, index) => (
            <span
              key={filter}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                index === 0 ? "bg-accent text-white" : "border border-border bg-white text-slate-600"
              }`}
            >
              {filter}
            </span>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {listeningItems.map((item) => {
            const played = snapshot.listeningItemIds.includes(item.id);
            const active = speech.activeText === item.text && speech.status !== "idle";

            return (
              <article key={item.id} className="flex h-full flex-col rounded-[28px] border border-border bg-white p-5 shadow-sm">
                <div className="rounded-[24px] bg-[linear-gradient(160deg,#d1fae5,#eff6ff)] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {item.accent}
                    </span>
                    <span className="text-sm font-medium text-slate-600">{item.durationLabel}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.preview}</p>
                </div>
                <div className="mt-5 flex flex-1 flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{item.category}</span>
                    {played ? (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Played</span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{item.text}</p>
                  <div className="mt-auto pt-5">
                    <div className="mb-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      {active ? "Playing now" : speech.status === "unsupported" ? "Speech API unavailable" : "Ready to preview"}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                        onClick={() => {
                          recordListening(item.id, item.title);
                          speech.speak(item.text);
                        }}
                      >
                        Play
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        onClick={speech.stop}
                      >
                        Stop
                      </button>
                      <Link
                        href={`/?task=${item.linkedTaskId}`}
                        className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Open task
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
