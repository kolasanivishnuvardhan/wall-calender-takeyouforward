'use client';

import { addMonths, isSameDay, startOfMonth, subMonths } from 'date-fns';
import { useCallback, useState } from 'react';

interface UseCalendarReturn {
  currentMonth: Date;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToMonth: (date: Date) => void;
  isToday: (date: Date) => boolean;
}

/** Month navigation and today detection contract for the wall calendar. */
export function useCalendar(initialDate: Date): UseCalendarReturn {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(initialDate));

  const goToPrevMonth = useCallback((): void => {
    setCurrentMonth((prev: Date) => startOfMonth(subMonths(prev, 1)));
  }, []);

  const goToNextMonth = useCallback((): void => {
    setCurrentMonth((prev: Date) => startOfMonth(addMonths(prev, 1)));
  }, []);

  const goToMonth = useCallback((date: Date): void => {
    setCurrentMonth(startOfMonth(date));
  }, []);

  const isToday = useCallback((date: Date): boolean => isSameDay(date, new Date()), []);

  return {
    currentMonth,
    goToPrevMonth,
    goToNextMonth,
    goToMonth,
    isToday,
  };
}
