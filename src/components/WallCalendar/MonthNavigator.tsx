import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useCalendarContext } from './CalendarContext';

/** Month navigation controls with accent-aware hover states. */
export function MonthNavigator(): JSX.Element {
  const { goToPrevMonth, goToNextMonth, theme } = useCalendarContext();

  return (
    <div className="flex items-center justify-between px-4 pb-2 pt-2">
      <button
        type="button"
        onClick={goToPrevMonth}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:text-white dark:bg-slate-700 dark:text-slate-200"
        style={{ '--hover-accent': theme.accentColor } as React.CSSProperties}
        onMouseEnter={(event): void => {
          event.currentTarget.style.backgroundColor = theme.accentColor;
        }}
        onMouseLeave={(event): void => {
          event.currentTarget.style.backgroundColor = '';
        }}
        aria-label="Go to previous month"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={goToNextMonth}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:text-white dark:bg-slate-700 dark:text-slate-200"
        onMouseEnter={(event): void => {
          event.currentTarget.style.backgroundColor = theme.accentColor;
        }}
        onMouseLeave={(event): void => {
          event.currentTarget.style.backgroundColor = '';
        }}
        aria-label="Go to next month"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
