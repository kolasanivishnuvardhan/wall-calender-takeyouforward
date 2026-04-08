"use client";

import { format, getMonth, getYear } from "date-fns";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useCalendar } from "@/hooks/useCalendar";
import { useMonthTheme } from "@/hooks/useMonthTheme";
import { useRangeSelection } from "@/hooks/useRangeSelection";
import { getActiveNoteKey, noteKeyIncludesDate } from "@/lib/calendarUtils";

import type {
  CalendarState,
  DateRange,
  MonthTheme,
  SelectionState,
} from "./types";

interface CalendarContextValue extends CalendarState {
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToMonth: (date: Date) => void;
  handleDayClick: (date: Date) => void;
  handleDayHover: (date: Date) => void;
  handleDayLeave: () => void;
  cancelSelection: () => void;
  selectionState: SelectionState;
  hasNoteForDate: (date: Date) => boolean;
  refreshStoredNoteKeys: () => void;
  setIsDarkMode: (value: boolean) => void;
  selectedRange: DateRange;
}

const THEME_STORAGE_KEY = "cal_theme_pref";
const NOTE_STORAGE_PREFIX = "cal_note_";

const CalendarContext = createContext<CalendarContextValue | null>(null);

/** Centralized calendar context to avoid prop drilling and share calendar state globally. */
export function CalendarProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { currentMonth, goToMonth, goToNextMonth, goToPrevMonth } = useCalendar(
    new Date(),
  );
  const {
    range,
    hoverDate,
    handleDayClick,
    handleDayHover,
    handleDayLeave,
    cancelSelection,
    selectionState,
  } = useRangeSelection();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [storedNoteKeys, setStoredNoteKeys] = useState<string[]>([]);

  const refreshStoredNoteKeys = useCallback((): void => {
    if (typeof window === "undefined") {
      return;
    }
    const keys: string[] = [];
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key: string | null = window.localStorage.key(index);
      if (key?.startsWith(NOTE_STORAGE_PREFIX)) {
        keys.push(key);
      }
    }
    setStoredNoteKeys(keys);
  }, []);

  useEffect((): void => {
    if (typeof window === "undefined") {
      return;
    }
    const pref: string | null = window.localStorage.getItem(THEME_STORAGE_KEY);
    const enabled: boolean = pref === "dark";
    setIsDarkMode(enabled);
    document.documentElement.classList.toggle("dark", enabled);
    refreshStoredNoteKeys();
  }, [refreshStoredNoteKeys]);

  const theme: MonthTheme = useMonthTheme(
    getMonth(currentMonth) + 1,
    getYear(currentMonth),
  );

  const activeNoteKey: string = useMemo<string>(
    () => getActiveNoteKey(currentMonth, range),
    [currentMonth, range],
  );

  const hasNoteForDate = useCallback(
    (date: Date): boolean =>
      storedNoteKeys.some((key: string) => noteKeyIncludesDate(key, date)),
    [storedNoteKeys],
  );

  const setDarkMode = useCallback((value: boolean): void => {
    setIsDarkMode(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, value ? "dark" : "light");
      document.documentElement.classList.toggle("dark", value);
    }
  }, []);

  const value: CalendarContextValue = {
    currentMonth,
    selectedRange: range,
    hoverDate,
    activeNoteKey,
    theme,
    isDarkMode,
    goToPrevMonth,
    goToNextMonth,
    goToMonth,
    handleDayClick,
    handleDayHover,
    handleDayLeave,
    cancelSelection,
    selectionState,
    hasNoteForDate,
    refreshStoredNoteKeys,
    setIsDarkMode: setDarkMode,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

/** Access Wall Calendar context state and commands. */
export function useCalendarContext(): CalendarContextValue {
  const context: CalendarContextValue | null = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendarContext must be used within CalendarProvider");
  }
  return context;
}

export function rangeAnnouncementText(range: DateRange): string {
  if (!range.start || !range.end) {
    return "";
  }
  return `Range selected: ${format(range.start, "MMMM d")} to ${format(range.end, "MMMM d")}`;
}
