export const HOLIDAYS_2025: Record<string, string> = {
  "2025-01-01": "New Year's Day",
  "2025-01-14": "Makar Sankranti",
  "2025-01-26": "Republic Day",
  "2025-02-26": "Maha Shivaratri",
  "2025-03-25": "Holi",
  "2025-04-14": "Dr. Ambedkar Jayanti",
  "2025-04-18": "Good Friday",
  "2025-05-12": "Buddha Purnima",
  "2025-06-07": "Eid ul-Adha",
  "2025-08-15": "Independence Day",
  "2025-08-16": "Janmashtami",
  "2025-09-29": "Dussehra",
  "2025-10-02": "Gandhi Jayanti",
  "2025-10-20": "Diwali",
  "2025-11-05": "Guru Nanak Jayanti",
  "2025-12-25": "Christmas Day",
};

export const HOLIDAYS_2026: Record<string, string> = {
  "2026-01-01": "New Year's Day",
  "2026-01-14": "Makar Sankranti",
  "2026-01-26": "Republic Day",
  "2026-02-15": "Maha Shivaratri",
  "2026-03-04": "Holi",
  "2026-04-03": "Good Friday",
  "2026-04-14": "Dr. Ambedkar Jayanti",
  "2026-05-31": "Buddha Purnima",
  "2026-06-27": "Eid ul-Adha",
  "2026-08-15": "Independence Day",
  "2026-09-20": "Ganesh Chaturthi",
  "2026-10-20": "Dussehra",
  "2026-11-08": "Diwali",
  "2026-11-15": "Guru Nanak Jayanti",
  "2026-12-25": "Christmas Day",
};

const HOLIDAYS_BY_YEAR: Record<number, Record<string, string>> = {
  2025: HOLIDAYS_2025,
  2026: HOLIDAYS_2026,
};

export function getHolidaysForYear(year: number): Record<string, string> {
  return HOLIDAYS_BY_YEAR[year] ?? {};
}
