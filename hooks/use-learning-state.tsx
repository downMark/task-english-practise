"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LearningEvent, LearningProgressSnapshot } from "@/data/types";
import { defaultLearningSnapshot, loadSnapshot, saveSnapshot } from "@/lib/storage";
import { resolveStreak, todayKey } from "@/lib/streak";

type LearningContextValue = {
  snapshot: LearningProgressSnapshot;
  selectPracticeTask: (taskId: string) => void;
  recordPracticeSession: (id: string, title: string) => void;
  markReadingComplete: (id: string, title: string) => void;
  recordListening: (id: string, title: string) => void;
};

const LearningContext = createContext<LearningContextValue | null>(null);

function appendEvent(history: LearningEvent[], event: LearningEvent) {
  return [event, ...history].slice(0, 30);
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<LearningProgressSnapshot>(defaultLearningSnapshot);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSnapshot(loadSnapshot());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveSnapshot(snapshot);
  }, [ready, snapshot]);

  const updateActivity = (updater: (draft: LearningProgressSnapshot, today: string) => LearningProgressSnapshot) => {
    setSnapshot((current) => {
      const today = todayKey();
      const next = updater(current, today);
      return {
        ...next,
        lastActiveDate: today,
        streakDays: resolveStreak(current.lastActiveDate, current.streakDays, today),
      };
    });
  };

  const value = useMemo<LearningContextValue>(
    () => ({
      snapshot,
      selectPracticeTask(taskId) {
        setSnapshot((current) => ({ ...current, recentPracticeTaskId: taskId }));
      },
      recordPracticeSession(id, title) {
        updateActivity((current, today) => ({
          ...current,
          recentPracticeTaskId: id,
          startedTaskIds: Array.from(new Set([id, ...current.startedTaskIds])),
          practiceHistory: appendEvent(current.practiceHistory, {
            id,
            title,
            date: today,
            type: "practice",
          }),
        }));
      },
      markReadingComplete(id, title) {
        updateActivity((current, today) => ({
          ...current,
          completedReadingIds: Array.from(new Set([id, ...current.completedReadingIds])),
          readingHistory: appendEvent(current.readingHistory, {
            id,
            title,
            date: today,
            type: "reading",
          }),
        }));
      },
      recordListening(id, title) {
        updateActivity((current, today) => ({
          ...current,
          listeningItemIds: Array.from(new Set([id, ...current.listeningItemIds])),
          listeningHistory: appendEvent(current.listeningHistory, {
            id,
            title,
            date: today,
            type: "listening",
          }),
        }));
      },
    }),
    [snapshot],
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearningState() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearningState must be used inside LearningProvider");
  }
  return context;
}
