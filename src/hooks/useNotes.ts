'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type SaveStatus = 'idle' | 'saving' | 'saved';

interface UseNotesReturn {
  content: string;
  setContent: (value: string) => void;
  saveStatus: SaveStatus;
  characterCount: number;
}

const MAX_CHARACTERS = 500;
const SAVE_DEBOUNCE_MS = 500;

/** Debounced localStorage-backed note model for selected month/day/range. */
export function useNotes(noteKey: string): UseNotesReturn {
  const [content, setContentState] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [loadedKey, setLoadedKey] = useState<string>('');
  const previousKeyRef = useRef<string>(noteKey);
  const contentRef = useRef<string>('');

  useEffect((): void => {
    contentRef.current = content;
  }, [content]);

  useEffect((): void => {
    if (typeof window === 'undefined') {
      return;
    }

    const previousKey: string = previousKeyRef.current;
    if (previousKey !== noteKey) {
      const draft: string = contentRef.current.trim();
      if (draft.length > 0) {
        window.localStorage.setItem(previousKey, contentRef.current);
      } else {
        window.localStorage.removeItem(previousKey);
      }
    }

    const stored: string | null = window.localStorage.getItem(noteKey);
    const nextContent: string = stored ?? '';
    setContentState(nextContent);
    contentRef.current = nextContent;
    previousKeyRef.current = noteKey;
    setLoadedKey(noteKey);
    setSaveStatus('idle');
  }, [noteKey]);

  useEffect((): (() => void) | void => {
    if (typeof window === 'undefined') {
      return;
    }
    if (loadedKey !== noteKey) {
      return;
    }

    setSaveStatus('saving');
    const timeoutId: number = window.setTimeout((): void => {
      if (content.trim().length > 0) {
        window.localStorage.setItem(noteKey, content);
      } else {
        window.localStorage.removeItem(noteKey);
      }
      setSaveStatus('saved');
      window.setTimeout((): void => setSaveStatus('idle'), 900);
    }, SAVE_DEBOUNCE_MS);

    return (): void => window.clearTimeout(timeoutId);
  }, [content, loadedKey, noteKey]);

  const setContent = (value: string): void => {
    const safeValue: string = value.slice(0, MAX_CHARACTERS);
    setContentState(safeValue);
  };

  const characterCount = useMemo<number>(() => content.length, [content]);

  return {
    content,
    setContent,
    saveStatus,
    characterCount,
  };
}
