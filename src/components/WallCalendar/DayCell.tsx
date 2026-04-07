import { format } from 'date-fns';
import { Pencil } from 'lucide-react';
import { memo, useMemo } from 'react';

import { HolidayBadge } from './HolidayBadge';
import type { DayData, DateRange } from './types';

interface DayCellProps {
  day: DayData;
  range: DateRange;
  hoverDate: Date | null;
  accentColor: string;
  accentLight: string;
  onClick: (date: Date) => void;
  onHover: (date: Date) => void;
  onLeave: () => void;
  isKeyboardFocused: boolean;
  onFocus: (date: Date) => void;
}

const BASE_CELL_CLASSES =
  'relative flex h-11 min-h-[44px] min-w-[44px] w-11 items-center justify-center rounded-full text-[13px] font-normal text-slate-800 outline-none dark:text-slate-100';
const DEFAULT_CLASSES = 'cursor-pointer transition-colors hover:bg-sky-50 dark:hover:bg-slate-700';
const OVERFLOW_CLASSES = 'pointer-events-none cursor-not-allowed select-none text-slate-300 dark:text-slate-600';
const DISABLED_CLASSES = 'text-slate-200 cursor-not-allowed pointer-events-none';

/** Single calendar day cell with range, note, holiday, and accessibility states. */
function DayCellComponent({
  day,
  range,
  hoverDate,
  accentColor,
  accentLight,
  onClick,
  onHover,
  onLeave,
  isKeyboardFocused,
  onFocus,
}: DayCellProps): JSX.Element {
  const isSingleDaySelection: boolean = Boolean(
    range.start && range.end && format(range.start, 'yyyy-MM-dd') === format(range.end, 'yyyy-MM-dd'),
  );

  const isRangeStart: boolean = Boolean(range.start && format(range.start, 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd'));
  const isRangeEnd: boolean = Boolean(range.end && format(range.end, 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd'));

  const previewEnd: Date | null = range.start && !range.end ? hoverDate : range.end;
  const isInRange: boolean = useMemo((): boolean => {
    if (!range.start || !previewEnd) {
      return false;
    }
    const dayKey: string = format(day.date, 'yyyy-MM-dd');
    const startKey: string = format(range.start, 'yyyy-MM-dd');
    const endKey: string = format(previewEnd, 'yyyy-MM-dd');
    const [minKey, maxKey] = startKey <= endKey ? [startKey, endKey] : [endKey, startKey];
    return dayKey >= minKey && dayKey <= maxKey;
  }, [day.date, previewEnd, range.start]);

  const isSelected: boolean = isRangeStart || isRangeEnd;

  const ariaLabel = `${format(day.date, 'MMMM d, yyyy, EEEE')}${day.holidayName ? `, Holiday: ${day.holidayName}` : ''}`;

  const className: string = [
    BASE_CELL_CLASSES,
    DEFAULT_CLASSES,
    !day.isCurrentMonth ? OVERFLOW_CLASSES : '',
    day.isDisabled ? DISABLED_CLASSES : '',
    day.isToday ? 'border-2 font-semibold' : '',
    isSingleDaySelection && isRangeStart ? 'text-white rounded-full font-bold' : '',
    isRangeStart && !isSingleDaySelection ? 'text-white rounded-l-full font-bold' : '',
    isRangeEnd && !isSingleDaySelection ? 'text-white rounded-r-full font-bold' : '',
    isInRange && !isSelected ? 'rounded-none text-sky-900 dark:text-slate-100' : '',
    isKeyboardFocused ? 'ring-2 ring-slate-500 ring-offset-1' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="gridcell"
      tabIndex={0}
      aria-selected={isSelected || isInRange}
      aria-label={ariaLabel}
      className={className}
      style={{
        backgroundColor: isSelected ? accentColor : isInRange ? accentLight : undefined,
        borderColor: day.isToday ? accentColor : undefined,
      }}
      onClick={(): void => onClick(day.date)}
      onMouseEnter={(): void => onHover(day.date)}
      onMouseLeave={onLeave}
      onFocus={(): void => onFocus(day.date)}
    >
      <span>{day.dayNumber}</span>
      {day.hasNote && day.isCurrentMonth ? (
        <Pencil className="absolute right-0.5 top-0.5 h-2.5 w-2.5 text-slate-500 dark:text-slate-300" />
      ) : null}
      {day.holidayName && day.isCurrentMonth ? (
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2">
          <HolidayBadge holidayName={day.holidayName} color={accentColor} />
        </div>
      ) : null}
    </button>
  );
}

export const DayCell = memo(DayCellComponent);
