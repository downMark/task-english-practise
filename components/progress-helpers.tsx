import type { LearningEvent } from "@/data/types";

function getDateLabel(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function countByDate(events: LearningEvent[]) {
  return events.reduce<Record<string, number>>((acc, event) => {
    acc[event.date] = (acc[event.date] ?? 0) + 1;
    return acc;
  }, {});
}

export function ActivityHeatmap({ events }: { events: LearningEvent[] }) {
  const counts = countByDate(events);
  const cells = Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - index));
    const key = date.toISOString().slice(0, 10);
    return {
      key,
      label: getDateLabel(13 - index),
      count: counts[key] ?? 0,
    };
  });

  return (
    <div className="grid grid-cols-7 gap-3">
      {cells.map((cell) => {
        const tone =
          cell.count >= 3
            ? "bg-accent"
            : cell.count === 2
              ? "bg-teal-300"
              : cell.count === 1
                ? "bg-teal-100"
                : "bg-slate-100";

        return (
          <div key={cell.key} className="space-y-2">
            <div className={`aspect-square rounded-2xl ${tone}`} />
            <p className="text-center text-xs text-slate-500">{cell.label}</p>
          </div>
        );
      })}
    </div>
  );
}
