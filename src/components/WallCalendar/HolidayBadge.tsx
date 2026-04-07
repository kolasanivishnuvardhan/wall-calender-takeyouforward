import { motion } from 'framer-motion';

interface HolidayBadgeProps {
  holidayName: string;
  color: string;
}

/** Accent dot with tooltip for holiday cells. */
export function HolidayBadge({ holidayName, color }: HolidayBadgeProps): JSX.Element {
  return (
    <div className="group relative mt-1 flex items-center justify-center">
      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: color }} />
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="pointer-events-none absolute bottom-2 z-20 hidden max-w-[120px] -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white shadow-lg group-hover:block dark:bg-slate-100 dark:text-slate-900"
        style={{ left: '50%' }}
      >
        {holidayName}
      </motion.div>
    </div>
  );
}
