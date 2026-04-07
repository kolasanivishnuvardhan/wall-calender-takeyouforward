import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import type { DateRange, DayData, DayGridOptions } from '@/components/WallCalendar/types';

const MONDAY_WEEK_START = 1;

/** Build a fixed 6-row (42 cell) month grid, Monday-first. */
export function buildDayGrid(month: Date, options: DayGridOptions): DayData[] {
  const monthStart: Date = startOfMonth(month);
  const monthEnd: Date = endOfMonth(monthStart);
  const gridStart: Date = startOfWeek(monthStart, { weekStartsOn: MONDAY_WEEK_START });
  const gridEnd: Date = endOfWeek(addDays(gridStart, 41), { weekStartsOn: MONDAY_WEEK_START });
  const days: Date[] = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return days.map((date: Date) => {
    const dayKey: string = format(date, 'yyyy-MM-dd');
    return {
      date,
      dayNumber: Number(format(date, 'd')),
      isCurrentMonth: isSameMonth(date, monthStart),
      isToday: isSameDay(date, options.today),
      isDisabled: Boolean(options.disablePastDates && isBefore(date, options.today) && !isSameDay(date, options.today)),
      holidayName: options.holidays[dayKey],
      hasNote: options.hasNoteForDate(date),
    };
  });
}

/** Create localStorage key for month-level note. */
export function createMonthNoteKey(date: Date): string {
  return `cal_note_${format(date, 'yyyy-MM')}`;
}

/** Create localStorage key for single-day note. */
export function createSingleDayNoteKey(date: Date): string {
  return `cal_note_${format(date, 'yyyy-MM-dd')}`;
}

/** Create localStorage key for range note. */
export function createRangeNoteKey(start: Date, end: Date): string {
  const normalizedStart: Date = isAfter(start, end) ? end : start;
  const normalizedEnd: Date = isAfter(start, end) ? start : end;
  return `cal_note_${format(normalizedStart, 'yyyy-MM-dd')}_${format(normalizedEnd, 'yyyy-MM-dd')}`;
}

/** Build active note key based on current selection. */
export function getActiveNoteKey(currentMonth: Date, range: DateRange): string {
  if (range.start && range.end && isSameDay(range.start, range.end)) {
    return createSingleDayNoteKey(range.start);
  }
  if (range.start && range.end) {
    return createRangeNoteKey(range.start, range.end);
  }
  if (range.start) {
    return createSingleDayNoteKey(range.start);
  }
  return createMonthNoteKey(currentMonth);
}

/** Human-readable range used in UI labels and announcements. */
export function formatRange(range: DateRange, fallbackMonth: Date): string {
  if (!range.start && !range.end) {
    return `Notes for ${format(fallbackMonth, 'MMMM yyyy')}`;
  }
  if (range.start && !range.end) {
    return `Notes for ${format(range.start, 'MMM d')}`;
  }
  if (range.start && range.end) {
    if (isSameDay(range.start, range.end)) {
      return `Notes for ${format(range.start, 'MMM d')}`;
    }
    return `Notes for ${format(range.start, 'MMM d')} – ${format(range.end, 'MMM d')}`;
  }
  return `Notes for ${format(fallbackMonth, 'MMMM yyyy')}`;
}

/** Parse and test whether a localStorage note key references a specific day. */
export function noteKeyIncludesDate(noteKey: string, date: Date): boolean {
  if (!noteKey.startsWith('cal_note_')) {
    return false;
  }
  const payload: string = noteKey.replace('cal_note_', '');
  const parts: string[] = payload.split('_');
  const targetKey: string = format(date, 'yyyy-MM-dd');

  if (parts.length === 1) {
    if (/^\d{4}-\d{2}$/.test(parts[0])) {
      return parts[0] === format(date, 'yyyy-MM');
    }
    return parts[0] === targetKey;
  }

  if (parts.length === 2) {
    const start: Date = parseISO(parts[0]);
    const end: Date = parseISO(parts[1]);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return false;
    }
    const minDate: Date = isAfter(start, end) ? end : start;
    const maxDate: Date = isAfter(start, end) ? start : end;
    return !isBefore(date, minDate) && !isAfter(date, maxDate);
  }

  return false;
}
