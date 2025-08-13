export const toDateKey = (d: Date): string => d.toISOString().slice(0, 10);

export const addDays = (d: Date, days: number): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);

export const startOfWeek = (d: Date): Date =>
  addDays(d, -((d.getDay() + 6) % 7));

export const formatDate = (d: Date): string =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

export const formatWeekday = (d: Date): string =>
  d.toLocaleDateString(undefined, { weekday: "short" });

export const formatWeekdayNarrow = (d: Date): string =>
  d.toLocaleDateString(undefined, { weekday: "narrow" });

export const calculateDuration = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );
};
