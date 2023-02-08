export interface DaySchedule {
  start: string;
  end: string;
  duration: number;
}

export const DayScheduleConst = {
  start: 'start',
  end: 'end',
  duration: 'duration',
} as const;

export interface WeekSchedule {
  [key: number]: DaySchedule;
}

export interface MonthSchedule {
  day: number;
  weekDayName: string;
  monthName: string;
  duration: number;
  start: string;
  end: string;
  isWeekend: boolean;
  totalHours: number;
}
