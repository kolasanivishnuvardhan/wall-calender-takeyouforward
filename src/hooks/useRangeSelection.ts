"use client";

import { isAfter, isBefore, isSameDay } from "date-fns";
import { useCallback, useState } from "react";

import type {
  DateRange,
  SelectionState,
} from "@/components/WallCalendar/types";

interface UseRangeSelectionReturn {
  range: DateRange;
  hoverDate: Date | null;
  handleDayClick: (date: Date) => void;
  handleDayHover: (date: Date) => void;
  handleDayLeave: () => void;
  cancelSelection: () => void;
  selectionState: SelectionState;
}

const EMPTY_RANGE: DateRange = { start: null, end: null };

/** State machine for IDLE -> START_SELECTED -> RANGE_COMPLETE interactions. */
export function useRangeSelection(): UseRangeSelectionReturn {
  const [range, setRange] = useState<DateRange>(EMPTY_RANGE);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectionState, setSelectionState] = useState<SelectionState>("IDLE");

  const handleDayClick = useCallback(
    (date: Date): void => {
      if (selectionState === "IDLE") {
        setRange({ start: date, end: null });
        setSelectionState("START_SELECTED");
        return;
      }

      if (selectionState === "START_SELECTED") {
        if (!range.start) {
          setRange({ start: date, end: null });
          return;
        }
        if (isBefore(date, range.start) && !isSameDay(date, range.start)) {
          setRange({ start: date, end: range.start });
          setHoverDate(null);
          setSelectionState("RANGE_COMPLETE");
          return;
        }
        setRange({
          start: range.start,
          end:
            isAfter(date, range.start) || isSameDay(date, range.start)
              ? date
              : range.start,
        });
        setHoverDate(null);
        setSelectionState("RANGE_COMPLETE");
        return;
      }

      setRange({ start: date, end: null });
      setHoverDate(null);
      setSelectionState("START_SELECTED");
    },
    [range.start, selectionState],
  );

  const handleDayHover = useCallback(
    (date: Date): void => {
      if (selectionState === "START_SELECTED") {
        setHoverDate(date);
      }
    },
    [selectionState],
  );

  const handleDayLeave = useCallback((): void => {
    setHoverDate(null);
  }, []);

  const cancelSelection = useCallback((): void => {
    setRange(EMPTY_RANGE);
    setHoverDate(null);
    setSelectionState("IDLE");
  }, []);

  return {
    range,
    hoverDate,
    handleDayClick,
    handleDayHover,
    handleDayLeave,
    cancelSelection,
    selectionState,
  };
}
