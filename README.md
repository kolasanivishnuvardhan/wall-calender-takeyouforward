# Wall Calendar - TakeYouForward Assignment

Interactive wall-calendar application built with Next.js, TypeScript, and Tailwind CSS.

[![Live Demo](https://img.shields.io/badge/demo-live-blue?style=for-the-badge)](https://wall-calender-takeyouforward.vercel.app/)

## Features

- Spiral-bound calendar look with themed month header and chevron divider
- Sunday-first 7-column month grid with overflow-day rendering
- Date range selection with hover preview and keyboard interactions
- Auto-saving notes with localStorage persistence
- Copy selected date range to clipboard
- Holiday badges with tooltips
- Mini previous/next month preview cards
- Theme switching with persisted dark mode preference
- Responsive layout with collapsible notes panel
- Accessible grid semantics and focus states

## Tech Stack

| Layer          | Choice                   |
| -------------- | ------------------------ |
| Framework      | Next.js 14 (App Router)  |
| Language       | TypeScript (strict mode) |
| Styling        | Tailwind CSS v3          |
| Motion         | Framer Motion            |
| Date Utilities | date-fns                 |
| Icons          | lucide-react             |
| Persistence    | localStorage             |

## Local Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Available Scripts

```bash
npm run dev    # Start development server
npm run lint   # Run ESLint checks
npm run build  # Create production build
npm run start  # Start production server
```

## Project Structure

```text
src/
  app/                    # App Router pages and global styles
  components/WallCalendar/# Calendar UI components
  hooks/                  # Custom state and behavior hooks
  lib/                    # Pure date and domain utilities
```

## Deployment (Vercel)

1. Push code to GitHub.
2. Import the repository in Vercel.
3. Use default settings.
4. Build command: npm run build
5. Output: .next

## Submission Checklist

- Live demo link updated in this README
- npm run lint passes
- npm run build passes
- Repository is public and includes complete source code

## Notes

- Browser-only APIs are guarded to avoid SSR issues.
- Calendar state is centralized with context plus focused custom hooks.
