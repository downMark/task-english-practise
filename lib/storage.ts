import type { LearningProgressSnapshot } from "@/data/types";

export const STORAGE_KEY = "english-practice-progress";

export const defaultLearningSnapshot: LearningProgressSnapshot = {
  recentPracticeTaskId: "forest-journey",
  startedTaskIds: [],
  completedReadingIds: [],
  listeningItemIds: [],
  practiceHistory: [],
  readingHistory: [],
  listeningHistory: [],
  lastActiveDate: null,
  streakDays: 0,
};

export function loadSnapshot(): LearningProgressSnapshot {
  if (typeof window === "undefined") return defaultLearningSnapshot;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultLearningSnapshot;
    return { ...defaultLearningSnapshot, ...JSON.parse(raw) } as LearningProgressSnapshot;
  } catch {
    return defaultLearningSnapshot;
  }
}

export function saveSnapshot(snapshot: LearningProgressSnapshot) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}
