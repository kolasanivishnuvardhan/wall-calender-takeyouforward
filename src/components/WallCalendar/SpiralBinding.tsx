const COIL_COUNT = 22;

/** Decorative spiral binding rendered with pure CSS to mimic a physical wall calendar. */
export function SpiralBinding(): JSX.Element {
  return (
    <div className="relative flex items-center justify-center px-4 pb-2 pt-3">
      <div className="absolute left-6 right-6 top-[22px] h-[3px] rounded-full bg-slate-300" />
      <div className="relative z-10 flex w-full items-center justify-between gap-1">
        {Array.from({ length: COIL_COUNT }).map((_, index: number) => (
          <span
            key={`coil-${index}`}
            className="h-6 w-4 rounded-full border-[3px] border-slate-400"
            style={{
              background: 'linear-gradient(180deg, #D1D5DB, #9CA3AF)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
