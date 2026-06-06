"use client";

import Link from "next/link";
import { readingArticles } from "@/data/content";
import { SectionCard } from "@/components/section-card";
import { useLearningState } from "@/hooks/use-learning-state";

export default function ReadingPage() {
  const { snapshot, markReadingComplete } = useLearningState();

  return (
    <div className="space-y-6">
      <SectionCard
        eyebrow="Daily Reading"
        title="Study one article, then jump straight into practice"
        actions={
          <div className="rounded-full bg-accentSoft px-4 py-2 text-sm font-medium text-accent">
            Completed {snapshot.completedReadingIds.length} articles
          </div>
        }
      >
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] bg-[linear-gradient(135deg,#0f766e,#1f2937)] p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-100">Featured article</p>
            <h3 className="mt-3 text-3xl font-semibold">{readingArticles[0].title}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-100">{readingArticles[0].preview}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {readingArticles[0].tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/?task=${readingArticles[0].linkedTaskId}`}
                className="rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Open Practice Task
              </Link>
              <button
                type="button"
                className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                onClick={() => markReadingComplete(readingArticles[0].id, readingArticles[0].title)}
              >
                Mark as Read
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {readingArticles.map((article) => {
              const done = snapshot.completedReadingIds.includes(article.id);
              return (
                <article key={article.id} className="rounded-[24px] border border-border bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">{article.level}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-900">{article.title}</h3>
                    </div>
                    {done ? (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Read</span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{article.preview}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-500">{article.estimatedMinutes} min read</span>
                    <div className="flex gap-2">
                      <Link
                        href={`/?task=${article.linkedTaskId}`}
                        className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                      >
                        Practice
                      </Link>
                      <button
                        type="button"
                        className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                        onClick={() => markReadingComplete(article.id, article.title)}
                      >
                        Mark read
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
