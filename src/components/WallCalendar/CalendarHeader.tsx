"use client";

import { format } from "date-fns";
import { getMonth } from "date-fns";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { MonthTheme } from "./types";

interface CalendarHeaderProps {
  monthDate: Date;
  theme: MonthTheme;
}

/** Hero image header with month/year overlay and theme-aware chevron divider. */
export function CalendarHeader({
  monthDate,
  theme,
}: CalendarHeaderProps): JSX.Element {
  const fallbackUrl = useMemo<string>(
    () =>
      `https://picsum.photos/seed/calendar-${getMonth(monthDate) + 1}/1200/640`,
    [monthDate],
  );
  const [imageSrc, setImageSrc] = useState<string>(theme.heroImageUrl);
  const [hasFallbackFailed, setHasFallbackFailed] = useState<boolean>(false);

  useEffect((): void => {
    setImageSrc(theme.heroImageUrl);
    setHasFallbackFailed(false);
  }, [theme.heroImageUrl]);

  return (
    <header>
      <div className="relative h-[160px] sm:h-[220px] overflow-hidden">
        {hasFallbackFailed ? (
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.85) 55%, rgba(51,65,85,0.95) 100%)",
            }}
            aria-hidden="true"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={theme.heroImageAlt}
            fill
            sizes="100vw"
            className="object-cover brightness-110 contrast-110"
            loading="lazy"
            unoptimized
            onError={(): void => {
              if (imageSrc !== fallbackUrl) {
                setImageSrc(fallbackUrl);
                return;
              }
              setHasFallbackFailed(true);
            }}
          />
        )}
        <div className="absolute bottom-4 right-4 text-right text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
          <p className="text-[13px] font-light uppercase tracking-[0.08em] opacity-80">
            {format(monthDate, "yyyy")}
          </p>
          <p className="font-serif text-[28px] font-extrabold leading-none uppercase">
            {format(monthDate, "MMMM")}
          </p>
        </div>
      </div>
      <svg
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className="block h-10 w-full"
        aria-hidden="true"
      >
        <path
          d="M0,60 L0,30 L100,0 L200,30 L300,0 L400,30 L400,60 Z"
          fill={theme.chevronColor}
        />
      </svg>
    </header>
  );
}
