"use client";

import type { SpeechStatus } from "@/lib/speech";

function statusLabel(status: SpeechStatus) {
  switch (status) {
    case "playing":
      return "Now reading aloud";
    case "paused":
      return "Playback paused";
    case "unsupported":
      return "Speech synthesis is not supported in this browser";
    case "error":
      return "Playback failed, please try again";
    default:
      return "Ready to play";
  }
}

export function PracticeControls({
  status,
  onPlay,
  onPause,
  onResume,
  onReplay,
}: {
  status: SpeechStatus;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onReplay: () => void;
}) {
  const isPlaying = status === "playing";
  const isPaused = status === "paused";

  return (
    <div className="rounded-[28px] border border-border bg-slate-900 p-5 text-white shadow-card sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-200">Playback</p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Listen to the full passage</h3>
          <p className="mt-2 text-sm text-slate-300">{statusLabel(status)}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {!isPlaying && !isPaused ? (
            <button
              type="button"
              className="rounded-full bg-teal-300 px-5 py-3 font-semibold text-slate-900 transition hover:bg-teal-200"
              onClick={onPlay}
            >
              Play
            </button>
          ) : null}
          {isPlaying ? (
            <button
              type="button"
              className="rounded-full bg-white/12 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              onClick={onPause}
            >
              Pause
            </button>
          ) : null}
          {isPaused ? (
            <button
              type="button"
              className="rounded-full bg-teal-300 px-5 py-3 font-semibold text-slate-900 transition hover:bg-teal-200"
              onClick={onResume}
            >
              Resume
            </button>
          ) : null}
          <button
            type="button"
            className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            onClick={onReplay}
          >
            Replay
          </button>
        </div>
      </div>
    </div>
  );
}
