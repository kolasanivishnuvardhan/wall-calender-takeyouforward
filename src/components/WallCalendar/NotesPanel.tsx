import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';

import { useNotes } from '@/hooks/useNotes';
import { formatRange } from '@/lib/calendarUtils';

import { useCalendarContext } from './CalendarContext';
import { CopyRangeButton } from './CopyRangeButton';

const MAX_CHARACTERS = 500;

interface NotesPanelProps {
  collapsible?: boolean;
  open?: boolean;
}

/** Notes panel with ruled-paper visual, debounced autosave, and localStorage persistence. */
export function NotesPanel({ collapsible = false, open = true }: NotesPanelProps): JSX.Element {
  const { activeNoteKey, currentMonth, selectedRange, refreshStoredNoteKeys, theme, isDarkMode } = useCalendarContext();
  const { content, setContent, saveStatus, characterCount } = useNotes(activeNoteKey);

  const label = useMemo<string>(() => formatRange(selectedRange, currentMonth), [currentMonth, selectedRange]);

  useEffect((): void => {
    if (saveStatus === 'saved') {
      refreshStoredNoteKeys();
    }
  }, [refreshStoredNoteKeys, saveStatus]);

  const visible = !collapsible || open;

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.aside
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/90"
          style={{ borderLeft: `4px solid ${theme.accentColor}` }}
        >
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{label}</p>
          <div className="relative">
            <textarea
              value={content}
              onChange={(event): void => setContent(event.target.value)}
              onBlur={(): void => {
                if (typeof window === 'undefined') {
                  return;
                }
                if (content.trim().length === 0) {
                  window.localStorage.removeItem(activeNoteKey);
                  refreshStoredNoteKeys();
                }
              }}
              maxLength={MAX_CHARACTERS}
              className="h-56 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, transparent 0, transparent 27px, #E2E8F0 28px, #E2E8F0 29px)',
                backgroundSize: 'calc(100% - 24px) 29px',
                backgroundPosition: '12px 34px',
                backgroundRepeat: 'repeat-y',
                backgroundOrigin: 'content-box',
                lineHeight: '28px',
                borderColor: isDarkMode ? '#334155' : undefined,
                backgroundColor: isDarkMode ? '#0F172A' : undefined,
                color: isDarkMode ? '#E2E8F0' : undefined,
              }}
              placeholder="Capture plans, reminders, and quick thoughts..."
            />
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <AnimatePresence mode="wait">
                <motion.span
                  key={saveStatus}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved ✓' : 'Idle'}
                </motion.span>
              </AnimatePresence>
              <span>
                {characterCount} / {MAX_CHARACTERS} characters
              </span>
            </div>
          </div>
          <CopyRangeButton noteContent={content} />
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
