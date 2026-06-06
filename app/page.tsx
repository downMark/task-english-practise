"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { practiceTasks } from "@/data/content";
import { useLearningState } from "@/hooks/use-learning-state";
import { useSpeechPlayer } from "@/hooks/use-speech-player";
import { PracticeControls } from "@/components/practice-controls";
import { PracticeReader } from "@/components/practice-reader";

export default function PracticePage() {
  const searchParams = useSearchParams();
  const { snapshot, recordPracticeSession, selectPracticeTask } = useLearningState();
  const [selectedTaskId, setSelectedTaskId] = useState(snapshot.recentPracticeTaskId);
  const speech = useSpeechPlayer();

  useEffect(() => {
    const fromQuery = searchParams.get("task");
    if (fromQuery && practiceTasks.some((task) => task.id === fromQuery)) {
      setSelectedTaskId(fromQuery);
      selectPracticeTask(fromQuery);
      return;
    }

    if (snapshot.recentPracticeTaskId) {
      setSelectedTaskId(snapshot.recentPracticeTaskId);
    }
  }, [searchParams, selectPracticeTask, snapshot.recentPracticeTaskId]);

  const currentTask = useMemo(
    () => practiceTasks.find((task) => task.id === selectedTaskId) ?? practiceTasks[0],
    [selectedTaskId],
  );

  const startPlayback = () => {
    recordPracticeSession(currentTask.id, currentTask.title);
    speech.speak(currentTask.text);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[330px_minmax(0,1fr)]">
        <div className="rounded-[28px] border border-border bg-white/90 p-5 shadow-card sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">Practice tasks</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Choose a passage and begin immediately</h2>
          <div className="mt-5 space-y-3">
            {practiceTasks.map((task, index) => {
              const active = task.id === currentTask.id;

              return (
                <button
                  key={task.id}
                  type="button"
                  className={`w-full rounded-[24px] border p-4 text-left transition ${
                    active
                      ? "border-accent bg-accentSoft shadow-sm"
                      : "border-border bg-white hover:border-accent/30 hover:bg-slate-50"
                  }`}
                  onClick={() => {
                    speech.stop();
                    setSelectedTaskId(task.id);
                    selectPracticeTask(task.id);
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Task {index + 1}</p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{task.title}</h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        task.level === "Beginner"
                          ? "bg-emerald-100 text-emerald-700"
                          : task.level === "Intermediate"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {task.level}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{task.preview}</p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-6">
          <section className="rounded-[28px] border border-border bg-white/90 p-6 shadow-card sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">Current practice</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">{currentTask.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{currentTask.focus}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">{currentTask.level}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                  {currentTask.estimatedMinutes} min
                </span>
              </div>
            </div>
          </section>
          <PracticeControls
            status={speech.status}
            onPlay={startPlayback}
            onPause={speech.pause}
            onResume={speech.resume}
            onReplay={startPlayback}
          />
          <PracticeReader text={currentTask.text} words={currentTask.words} />
        </div>
      </section>
    </div>
  );
}
