import WallCalendar from '@/components/WallCalendar';

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-sky-50 p-4 sm:p-8">
      <WallCalendar />
    </main>
  );
}
