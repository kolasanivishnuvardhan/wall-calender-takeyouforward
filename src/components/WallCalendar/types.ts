export type DayCellState =
  | 'default'
  | 'today'
  | 'range-start'
  | 'range-end'
  | 'in-range'
  | 'overflow'
  | 'disabled'
  | 'holiday'
  | 'has-note';

export interface DayData {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isDisabled: boolean;
  holidayName?: string;
  hasNote: boolean;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface MonthTheme {
  month: number;
  accentColor: string;
  accentLight: string;
  chevronColor: string;
  heroImageUrl: string;
  heroImageAlt: string;
  bgGradient: string;
  darkBg: string;
}

export interface CalendarNote {
  key: string;
  content: string;
  updatedAt: string;
}

export interface CalendarState {
  currentMonth: Date;
  selectedRange: DateRange;
  hoverDate: Date | null;
  activeNoteKey: string;
  theme: MonthTheme;
  isDarkMode: boolean;
}

export type SelectionState = 'IDLE' | 'START_SELECTED' | 'RANGE_COMPLETE';

export interface DayGridOptions {
  disablePastDates?: boolean;
  today: Date;
  holidays: Record<string, string>;
  hasNoteForDate: (date: Date) => boolean;
}
