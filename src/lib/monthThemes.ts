import type { MonthTheme } from '@/components/WallCalendar/types';

interface HeroPalette {
  skyTop: string;
  skyBottom: string;
  hill: string;
  peak: string;
}

function createHeroImageDataUri(monthLabel: string, palette: HeroPalette): string {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 640' preserveAspectRatio='xMidYMid slice'>
      <defs>
        <linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='${palette.skyTop}' />
          <stop offset='100%' stop-color='${palette.skyBottom}' />
        </linearGradient>
      </defs>
      <rect width='1200' height='640' fill='url(#sky)' />
      <rect y='0' width='1200' height='640' fill='rgba(255,255,255,0.06)' />
      <circle cx='980' cy='120' r='74' fill='rgba(255,255,255,0.35)' />
      <path d='M0 460 L180 370 L360 430 L520 340 L730 440 L920 360 L1200 455 L1200 640 L0 640 Z' fill='${palette.hill}' opacity='0.86' />
      <path d='M180 640 L430 300 L610 640 Z' fill='${palette.peak}' opacity='0.95' />
      <path d='M520 640 L760 260 L980 640 Z' fill='${palette.peak}' opacity='0.86' />
      <text x='60' y='594' fill='rgba(255,255,255,0.92)' font-family='DM Sans, Arial, sans-serif' font-size='44' font-weight='700' letter-spacing='4'>${monthLabel}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const MONTH_THEMES: MonthTheme[] = [
  {
    month: 1,
    accentColor: '#0EA5E9',
    accentLight: '#E0F2FE',
    chevronColor: '#0EA5E9',
    heroImageUrl: createHeroImageDataUri('JANUARY', {
      skyTop: '#0EA5E9',
      skyBottom: '#1D4ED8',
      hill: '#2563EB',
      peak: '#DBEAFE',
    }),
    heroImageAlt: 'Mountain climber on snowy peak',
    bgGradient: 'from-slate-50 to-sky-50',
    darkBg: '#0C1A2E',
  },
  {
    month: 2,
    accentColor: '#EC4899',
    accentLight: '#FCE7F3',
    chevronColor: '#EC4899',
    heroImageUrl: createHeroImageDataUri('FEBRUARY', {
      skyTop: '#F472B6',
      skyBottom: '#DB2777',
      hill: '#EC4899',
      peak: '#FCE7F3',
    }),
    heroImageAlt: 'Pink cherry blossoms',
    bgGradient: 'from-pink-50 to-rose-50',
    darkBg: '#1A0A12',
  },
  {
    month: 3,
    accentColor: '#10B981',
    accentLight: '#D1FAE5',
    chevronColor: '#10B981',
    heroImageUrl: createHeroImageDataUri('MARCH', {
      skyTop: '#34D399',
      skyBottom: '#059669',
      hill: '#10B981',
      peak: '#D1FAE5',
    }),
    heroImageAlt: 'Spring meadow with wildflowers',
    bgGradient: 'from-emerald-50 to-green-50',
    darkBg: '#061A0F',
  },
  {
    month: 4,
    accentColor: '#F59E0B',
    accentLight: '#FEF3C7',
    chevronColor: '#F59E0B',
    heroImageUrl: createHeroImageDataUri('APRIL', {
      skyTop: '#FBBF24',
      skyBottom: '#F59E0B',
      hill: '#F59E0B',
      peak: '#FEF3C7',
    }),
    heroImageAlt: 'Sunlight over spring hills',
    bgGradient: 'from-amber-50 to-yellow-50',
    darkBg: '#1C1303',
  },
  {
    month: 5,
    accentColor: '#84CC16',
    accentLight: '#ECFCCB',
    chevronColor: '#84CC16',
    heroImageUrl: createHeroImageDataUri('MAY', {
      skyTop: '#A3E635',
      skyBottom: '#65A30D',
      hill: '#84CC16',
      peak: '#ECFCCB',
    }),
    heroImageAlt: 'Lush green landscape',
    bgGradient: 'from-lime-50 to-green-50',
    darkBg: '#101A04',
  },
  {
    month: 6,
    accentColor: '#F97316',
    accentLight: '#FFEDD5',
    chevronColor: '#F97316',
    heroImageUrl: createHeroImageDataUri('JUNE', {
      skyTop: '#FDBA74',
      skyBottom: '#F97316',
      hill: '#F97316',
      peak: '#FFEDD5',
    }),
    heroImageAlt: 'Sunny beach in summer',
    bgGradient: 'from-orange-50 to-amber-50',
    darkBg: '#1B0F07',
  },
  {
    month: 7,
    accentColor: '#EF4444',
    accentLight: '#FEE2E2',
    chevronColor: '#EF4444',
    heroImageUrl: createHeroImageDataUri('JULY', {
      skyTop: '#F87171',
      skyBottom: '#DC2626',
      hill: '#EF4444',
      peak: '#FEE2E2',
    }),
    heroImageAlt: 'Bold red sunset sky',
    bgGradient: 'from-rose-50 to-red-50',
    darkBg: '#1C0909',
  },
  {
    month: 8,
    accentColor: '#F59E0B',
    accentLight: '#FEF3C7',
    chevronColor: '#F59E0B',
    heroImageUrl: createHeroImageDataUri('AUGUST', {
      skyTop: '#FCD34D',
      skyBottom: '#D97706',
      hill: '#F59E0B',
      peak: '#FEF3C7',
    }),
    heroImageAlt: 'Golden alpine sunlight',
    bgGradient: 'from-yellow-50 to-amber-50',
    darkBg: '#1C1405',
  },
  {
    month: 9,
    accentColor: '#B45309',
    accentLight: '#FDE68A',
    chevronColor: '#B45309',
    heroImageUrl: createHeroImageDataUri('SEPTEMBER', {
      skyTop: '#D97706',
      skyBottom: '#B45309',
      hill: '#B45309',
      peak: '#FDE68A',
    }),
    heroImageAlt: 'Autumn trees and trail',
    bgGradient: 'from-amber-100 to-orange-100',
    darkBg: '#1A1208',
  },
  {
    month: 10,
    accentColor: '#EA580C',
    accentLight: '#FFEDD5',
    chevronColor: '#EA580C',
    heroImageUrl: createHeroImageDataUri('OCTOBER', {
      skyTop: '#FB923C',
      skyBottom: '#EA580C',
      hill: '#EA580C',
      peak: '#FFEDD5',
    }),
    heroImageAlt: 'Burnt orange fall valley',
    bgGradient: 'from-orange-100 to-amber-100',
    darkBg: '#1A0E07',
  },
  {
    month: 11,
    accentColor: '#6366F1',
    accentLight: '#E0E7FF',
    chevronColor: '#6366F1',
    heroImageUrl: createHeroImageDataUri('NOVEMBER', {
      skyTop: '#818CF8',
      skyBottom: '#6366F1',
      hill: '#6366F1',
      peak: '#E0E7FF',
    }),
    heroImageAlt: 'Indigo twilight mountain silhouette',
    bgGradient: 'from-indigo-50 to-violet-50',
    darkBg: '#0B0E1D',
  },
  {
    month: 12,
    accentColor: '#6B7280',
    accentLight: '#E5E7EB',
    chevronColor: '#6B7280',
    heroImageUrl: createHeroImageDataUri('DECEMBER', {
      skyTop: '#60A5FA',
      skyBottom: '#1E40AF',
      hill: '#94A3B8',
      peak: '#F1F5F9',
    }),
    heroImageAlt: 'Snowy mountain cabin scene',
    bgGradient: 'from-slate-100 to-zinc-100',
    darkBg: '#111827',
  },
];
