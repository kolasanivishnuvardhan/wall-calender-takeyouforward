import {
  addMonths,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { useCalendarContext } from "./CalendarContext";

interface PreviewCardProps {
  offset: number;
  title: string;
}

/** Compact prev/next month visual references with click-to-navigate behavior. */
export function MiniMonthPreview(): JSX.Element {
  return (
    <div className="hidden gap-3 sm:grid sm:grid-cols-2">
      <PreviewCard offset={-1} title="Previous" />
      <PreviewCard offset={1} title="Next" />
    </div>
  );
}

function PreviewCard({ offset, title }: PreviewCardProps): JSX.Element {
  const { currentMonth, goToMonth } = useCalendarContext();
  const month: Date = addMonths(currentMonth, offset);
  const start: Date = startOfWeek(startOfMonth(month), { weekStartsOn: 0 });
  const days: Date[] = eachDayOfInterval({
    start,
    end: endOfWeek(addMonths(start, 1), { weekStartsOn: 0 }),
  }).slice(0, 35);

  return (
    <button
      type="button"
      onClick={(): void => goToMonth(month)}
      className="w-full rounded-2xl border border-slate-200 bg-white/90 p-3 text-left shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
      aria-label={`Open ${format(month, "MMMM yyyy")}`}
    >
      <p className="mb-1 text-[10px] uppercase tracking-[0.08em] text-slate-500">
        {title}
      </p>
      <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        {format(month, "MMMM")}
      </p>
      <div className="grid grid-cols-7 gap-1 text-[10px] text-slate-400">
        {days.map((day: Date) => (
          <span
            key={`${offset}-${format(day, "yyyy-MM-dd")}`}
            className="flex h-5 items-center justify-center"
          >
            {format(day, "d")}
          </span>
        ))}
      </div>
    </button>
  );
}
