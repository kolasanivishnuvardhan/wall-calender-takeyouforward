import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { useCalendarContext } from './CalendarContext';

interface CopyRangeButtonProps {
  noteContent: string;
}

const TOAST_DURATION_MS = 2000;

/** Copy selected range and note text to clipboard with transient toast feedback. */
export function CopyRangeButton({ noteContent }: CopyRangeButtonProps): JSX.Element | null {
  const { selectedRange, theme } = useCalendarContext();
  const [copied, setCopied] = useState<boolean>(false);
  const { start, end } = selectedRange;

  if (!start || !end) {
    return null;
  }

  const handleCopy = async (): Promise<void> => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    const payload = `📅 ${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}\n📝 ${
      noteContent.trim() || '(no notes)'
    }`;
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    window.setTimeout((): void => setCopied(false), TOAST_DURATION_MS);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(): void => {
          void handleCopy();
        }}
        className="mt-2 min-h-[44px] rounded-lg px-3 py-2 text-sm font-semibold text-white"
        style={{ backgroundColor: theme.accentColor }}
      >
        📋 Copy Range
      </button>
      <AnimatePresence>
        {copied ? (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute left-0 top-full mt-2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white"
          >
            Copied!
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
