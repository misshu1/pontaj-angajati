export interface DaySchedule {
  start: string;
  end: string;
  duration: string;
}

export const DayScheduleConst = {
  start: 'start',
  end: 'end',
  duration: 'duration',
} as const;

export interface WeekSchedule {
  [key: number]: DaySchedule;
}
