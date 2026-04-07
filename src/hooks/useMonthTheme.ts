import { MONTH_THEMES } from '@/lib/monthThemes';

import type { MonthTheme } from '@/components/WallCalendar/types';

/** Resolve the active visual theme by month; year kept for extensibility. */
export function useMonthTheme(month: number, year: number): MonthTheme {
  void year;
  return MONTH_THEMES.find((theme: MonthTheme) => theme.month === month) ?? MONTH_THEMES[0];
}
