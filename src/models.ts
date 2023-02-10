export interface DaySchedule {
  start: string;
  end: string;
  duration: number;
}

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
  eventType: ScheduleLegendId | null;
}

export type ScheduleLegendId =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'F'
  | 'I'
  | 'J'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'R'
  | 'S';

export interface ScheduleLegendType {
  id: ScheduleLegendId;
  name: string;
}

export interface ScheduleEventType {
  day: number;
  month: number;
  year: number;
  eventType: ScheduleLegendId;
}
