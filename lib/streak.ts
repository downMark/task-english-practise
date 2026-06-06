export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function parseDate(date: string) {
  return new Date(`${date}T00:00:00`);
}

export function resolveStreak(lastActiveDate: string | null, currentStreak: number, nextDate: string) {
  if (!lastActiveDate) return 1;
  if (lastActiveDate === nextDate) return Math.max(currentStreak, 1);

  const previous = parseDate(lastActiveDate);
  const current = parseDate(nextDate);
  const diff = Math.round((current.getTime() - previous.getTime()) / 86400000);

  if (diff === 1) return currentStreak + 1;
  return 1;
}
