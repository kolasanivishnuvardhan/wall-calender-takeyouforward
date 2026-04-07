'use client';

import { addMonths } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { CalendarProvider, rangeAnnouncementText, useCalendarContext } from './CalendarContext';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';
import { MiniMonthPreview } from './MiniMonthPreview';
import { MonthNavigator } from './MonthNavigator';
import { NotesPanel } from './NotesPanel';
import { SpiralBinding } from './SpiralBinding';
import { ThemeSwitcher } from './ThemeSwitcher';

const SWIPE_THRESHOLD_PX = 50;

const variants = {
  enter: (direction: number): { rotateY: number; opacity: number } => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
  }),
  center: { rotateY: 0, opacity: 1 },
  exit: (direction: number): { rotateY: number; opacity: number } => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
  }),
};

/** Main wall calendar layout shell with responsive behavior and page-flip transitions. */
function WallCalendarShell(): JSX.Element {
  const { currentMonth, goToNextMonth, goToPrevMonth, selectedRange, theme, isDarkMode, cancelSelection } =
    useCalendarContext();
  const [direction, setDirection] = useState<number>(1);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const pointerStartX = useRef<number | null>(null);

  const monthKey = useMemo<string>(() => `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`, [currentMonth]);
  const previousMonthKeyRef = useRef<string>(monthKey);

  const previewMonth = useMemo<Date>(() => addMonths(currentMonth, 0), [currentMonth]);
  void previewMonth;

  useEffect((): void => {
    if (previousMonthKeyRef.current !== monthKey) {
      cancelSelection();
      previousMonthKeyRef.current = monthKey;
    }
  }, [cancelSelection, monthKey]);

  const onSwipeStart = (event: React.PointerEvent<HTMLDivElement>): void => {
    pointerStartX.current = event.clientX;
  };

  const onSwipeEnd = (event: React.PointerEvent<HTMLDivElement>): void => {
    if (pointerStartX.current === null) {
      return;
    }
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) {
      return;
    }
    if (delta < 0) {
      setDirection(1);
      goToNextMonth();
      return;
    }
    setDirection(-1);
    goToPrevMonth();
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-4">
      <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/85 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">SpiralWall Calendar</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Plan beautifully, month by month</p>
          </div>
        </div>
        <ThemeSwitcher />
      </header>

      <div className="flex w-full flex-col gap-4 lg:flex-row">
      <aside className="order-2 w-full lg:order-1 lg:w-[38%]">
        <button
          type="button"
          className="mb-2 flex min-h-[44px] w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 sm:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          onClick={(): void => setIsNotesOpen((prev: boolean) => !prev)}
        >
          Notes Panel
          <span>{isNotesOpen ? '−' : '+'}</span>
        </button>
        <div className="sm:hidden">
          <NotesPanel collapsible open={isNotesOpen} />
        </div>
        <div className="hidden sm:block">
          <NotesPanel />
        </div>
        <div className="mt-3">
          <MiniMonthPreview />
        </div>
      </aside>

      <div className="order-1 flex w-full justify-center lg:order-2 lg:w-[62%]">
        <div className="w-full max-w-[460px]">
          <div className="relative" style={{ perspective: '1200px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={monthKey}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                onPointerDown={onSwipeStart}
                onPointerUp={onSwipeEnd}
                className={`overflow-hidden rounded-xl shadow-calendar ${
                  isDarkMode ? 'bg-slate-900' : `bg-gradient-to-br ${theme.bgGradient}`
                }`}
                style={{ backgroundColor: isDarkMode ? theme.darkBg : '#FFFFFF' }}
              >
                <SpiralBinding />
                <CalendarHeader monthDate={currentMonth} theme={theme} />
                <MonthNavigator />
                <CalendarGrid />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {rangeAnnouncementText(selectedRange)}
      </div>
    </section>
  );
}

/** App-level wall calendar export with provider wiring. */
export default function WallCalendar(): JSX.Element {
  return (
    <CalendarProvider>
      <WallCalendarShell />
    </CalendarProvider>
  );
}
