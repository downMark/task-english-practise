export type Level = "Beginner" | "Intermediate" | "Advanced";

export type WordMeaning = {
  word: string;
  meaning: string;
  partOfSpeech?: string;
};

export type VocabularyMap = Record<string, WordMeaning>;

export type PracticeTask = {
  id: string;
  title: string;
  level: Level;
  preview: string;
  text: string;
  focus: string;
  estimatedMinutes: number;
  words: VocabularyMap;
};

export type ReadingArticle = {
  id: string;
  title: string;
  level: Level;
  preview: string;
  text: string;
  tags: string[];
  estimatedMinutes: number;
  linkedTaskId: string;
  words: VocabularyMap;
};

export type ListeningItem = {
  id: string;
  title: string;
  level: Level;
  preview: string;
  text: string;
  category: string;
  accent: string;
  durationLabel: string;
  linkedTaskId: string;
  words: VocabularyMap;
};

export type LearningEvent = {
  id: string;
  title: string;
  date: string;
  type: "practice" | "reading" | "listening";
};

export type LearningProgressSnapshot = {
  recentPracticeTaskId: string;
  startedTaskIds: string[];
  completedReadingIds: string[];
  listeningItemIds: string[];
  practiceHistory: LearningEvent[];
  readingHistory: LearningEvent[];
  listeningHistory: LearningEvent[];
  lastActiveDate: string | null;
  streakDays: number;
};
