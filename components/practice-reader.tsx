"use client";

import { useMemo, useState } from "react";
import type { VocabularyMap } from "@/data/types";
import { needsLeadingSpace, normalizeWord, tokenizeText } from "@/lib/tokenize";

type PracticeReaderProps = {
  text: string;
  words: VocabularyMap;
};

export function PracticeReader({ text, words }: PracticeReaderProps) {
  const tokens = useMemo(() => tokenizeText(text, words), [text, words]);
  const [activeWord, setActiveWord] = useState<string | null>(null);

  return (
    <div
      className="rounded-[28px] border border-border bg-white/90 p-6 shadow-card sm:p-8"
      onClick={() => setActiveWord(null)}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">Reading mode</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Read, listen, and inspect vocabulary in place</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Hover on desktop, tap on mobile</span>
      </div>
      <p className="reading-serif text-[1.18rem] leading-9 text-slate-700 sm:text-[1.28rem]">
        {tokens.map((token, index) => {
          const previous = index > 0 ? tokens[index - 1] : null;
          const meaning = words[normalizeWord(token.value)];
          const showActive = activeWord === `${token.normalized}-${index}`;

          return (
            <span key={`${token.value}-${index}`}>
              {needsLeadingSpace(previous, token) ? " " : null}
              {token.hasMeaning && meaning ? (
                <span className="group relative inline-block">
                  <button
                    type="button"
                    className="rounded px-0.5 text-left text-slate-900 underline decoration-dotted underline-offset-4 transition hover:bg-accentSoft"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveWord((current) => (current === `${token.normalized}-${index}` ? null : `${token.normalized}-${index}`));
                    }}
                  >
                    {token.value}
                  </button>
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-52 -translate-x-1/2 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-50 shadow-2xl transition md:invisible md:opacity-0 md:group-hover:visible md:group-hover:opacity-100 ${
                      showActive ? "visible opacity-100" : "invisible opacity-0 md:visible"
                    }`}
                  >
                    <span className="block font-semibold text-white">{meaning.word}</span>
                    <span className="mt-1 block text-slate-200">
                      {meaning.meaning}
                      {meaning.partOfSpeech ? ` · ${meaning.partOfSpeech}` : ""}
                    </span>
                  </span>
                </span>
              ) : (
                <span>{token.value}</span>
              )}
            </span>
          );
        })}
      </p>
    </div>
  );
}
