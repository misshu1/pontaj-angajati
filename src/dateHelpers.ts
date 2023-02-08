import { WeekSchedule } from './models';

export const formatDate = (date: Date): string => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  } as const;
  const df = new Intl.DateTimeFormat('ro-RO', options);

  return df.format(date);
};

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return formatDate(date1) === formatDate(date2);
};

export const isHoloday = (
  date: Date,
  holodays: string[] | undefined
): boolean => {
  if (holodays) {
    return holodays.includes(formatDate(date));
  }

  return false;
};

export const isWeekend = (date: Date): boolean => {
  return date.getDay() === 6 || date.getDay() === 0;
};

export const weekDay = (date: Date): string => {
  const format = new Intl.DateTimeFormat('ro-RO', { weekday: 'short' }).format;
  const dayName = format(date);
  const capitalizedWeekDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);

  return capitalizedWeekDay;
};

export const monthName = (date: Date): string => {
  const format = new Intl.DateTimeFormat('ro-RO', { month: 'short' }).format;
  const dayName = format(date);
  const capitalizedWeekDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);

  return capitalizedWeekDay;
};

export const getHours = (
  date: Date,
  schedule: WeekSchedule,
  holodays: string[] | undefined
): number => {
  if (isHoloday(date, holodays)) return 0;

  return schedule[date.getDay()]?.duration ?? 0;
};

export const getStartHour = (
  date: Date,
  schedule: WeekSchedule,
  holodays: string[] | undefined
) => {
  if (isHoloday(date, holodays)) return '';

  return schedule[date.getDay()]?.start ?? '';
};

export const getEndHour = (
  date: Date,
  schedule: WeekSchedule,
  holodays: string[] | undefined
) => {
  if (isHoloday(date, holodays)) return '';

  return schedule[date.getDay()]?.end ?? '';
};

// Returns an array containing the last 5 years from current year
export const yearsList = Array.from(
  { length: 5 },
  (_, i) => new Date().getFullYear() - i
);

export const monthsListValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
