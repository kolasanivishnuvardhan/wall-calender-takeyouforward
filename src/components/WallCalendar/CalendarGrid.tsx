import { addDays, format, getYear, isSameDay } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

import { useCalendarContext } from './CalendarContext';
import { DayCell } from './DayCell';
import { HOLIDAYS_2025 } from '@/lib/holidays';
import { buildDayGrid } from '@/lib/calendarUtils';

import type { DayData } from './types';

const DAY_HEADERS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

/** Main 7-column wall calendar date grid with keyboard support and range logic. */
export function CalendarGrid(): JSX.Element {
  const {
    currentMonth,
    selectedRange,
    hoverDate,
    theme,
    isDarkMode,
    handleDayClick,
    handleDayHover,
    handleDayLeave,
    hasNoteForDate,
    cancelSelection,
  } = useCalendarContext();

  const [focusedDate, setFocusedDate] = useState<Date>(currentMonth);

  const holidays = useMemo<Record<string, string>>(
    () => (getYear(currentMonth) === 2025 ? HOLIDAYS_2025 : {}),
    [currentMonth],
  );

  const days: DayData[] = useMemo(
    () =>
      buildDayGrid(currentMonth, {
        disablePastDates: false,
        today: new Date(),
        holidays,
        hasNoteForDate,
      }),
    [currentMonth, hasNoteForDate, holidays],
  );

  const onGridKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Escape') {
        cancelSelection();
        return;
      }

      if (event.key === 'Enter') {
        handleDayClick(focusedDate);
        return;
      }

      const offsetMap: Record<string, number> = {
        ArrowLeft: -1,
        ArrowRight: 1,
        ArrowUp: -7,
        ArrowDown: 7,
      };

      const offset: number | undefined = offsetMap[event.key];
      if (offset === undefined) {
        return;
      }

      event.preventDefault();
      setFocusedDate((prev: Date) => addDays(prev, offset));
    },
    [cancelSelection, focusedDate, handleDayClick],
  );

  return (
    <section className="bg-white px-4 pb-5 pt-3 dark:bg-[#1E293B] sm:px-4 sm:py-3">
      <div className="mb-2 grid grid-cols-7 gap-[2px]">
        {DAY_HEADERS.map((header: string, index: number) => (
          <div
            key={header}
            className="flex h-9 items-center justify-center text-[10px] font-semibold tracking-[0.1em]"
            style={{
              color:
                index === 5
                  ? theme.accentColor
                  : index === 6
                    ? '#EF4444'
                    : isDarkMode
                      ? '#94A3B8'
                      : '#64748B',
            }}
          >
            {header}
          </div>
        ))}
      </div>
      <div role="grid" tabIndex={0} className="grid grid-cols-7 gap-[2px]" onKeyDown={onGridKeyDown}>
        {days.map((day: DayData) => (
          <DayCell
            key={format(day.date, 'yyyy-MM-dd')}
            day={day}
            range={selectedRange}
            hoverDate={hoverDate}
            accentColor={theme.accentColor}
            accentLight={theme.accentLight}
            onClick={handleDayClick}
            onHover={handleDayHover}
            onLeave={handleDayLeave}
            isKeyboardFocused={isSameDay(day.date, focusedDate)}
            onFocus={setFocusedDate}
          />
        ))}
      </div>
    </section>
  );
}
