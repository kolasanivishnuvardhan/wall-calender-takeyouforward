import { Moon, Sun } from 'lucide-react';

import { useCalendarContext } from './CalendarContext';

/** Persisted light/dark mode switch for the wall calendar experience. */
export function ThemeSwitcher(): JSX.Element {
  const { isDarkMode, setIsDarkMode } = useCalendarContext();

  return (
    <button
      type="button"
      onClick={(): void => setIsDarkMode(!isDarkMode)}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
