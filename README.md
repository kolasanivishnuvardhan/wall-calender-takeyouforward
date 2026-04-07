

Production-grade, interactive wall-calendar experience inspired by a physical spiral-bound desk/wall calendar.

[![Live Demo](https://img.shields.io/badge/demo-live-blue?style=for-the-badge)](https://your-live-demo-url.example.com)

## ✅ Features

- ✅ Spiral-bound physical calendar aesthetic (CSS-rendered coils, hero, themed chevron)
- ✅ 7-column Monday-first calendar with overflow/holiday/note indicators
- ✅ Date range selection state machine with hover preview and keyboard support
- ✅ Debounced note auto-save with localStorage persistence and status transitions
- ✅ Range copy-to-clipboard action with toast feedback
- ✅ Dynamic monthly themes (12 months with accent + image + dark palette)
- ✅ Holiday markers with hover tooltips
- ✅ Mini previous/next month preview cards
- ✅ Page flip motion transitions for month navigation
- ✅ Dark mode with persisted preference
- ✅ Mobile swipe navigation and collapsible notes panel
- ✅ Accessibility support (`role=grid`, `role=gridcell`, `aria-live`, focus rings)

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 |
| Motion | Framer Motion |
| Date Math | date-fns |
| Icons | lucide-react |
| Persistence | localStorage only |

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Architecture Decisions

- **date-fns over moment.js**: smaller footprint, immutable helpers, tree-shakable utilities.
- **Framer Motion**: expressive and composable transition API for the page-flip interaction.
- **Calendar Context**: central calendar state avoids deep prop drilling and keeps features cohesive.
- **Custom hooks**:
  - `useCalendar`: month navigation and date helpers
  - `useRangeSelection`: deterministic selection state machine
  - `useNotes`: debounced persistence and save-state feedback
  - `useMonthTheme`: centralized visual theme resolution

## Project Structure

```text
src/
├── app/
├── components/WallCalendar/
├── hooks/
├── lib/
```

## Screenshots

- Desktop View — _placeholder_
- Tablet View — _placeholder_
- Mobile + Collapsible Notes — _placeholder_
- Dark Mode — _placeholder_

## Notes

- Designed around tactile, print-like visual language while remaining fully interactive.
- All localStorage access is browser-guarded (`typeof window !== 'undefined'`).
