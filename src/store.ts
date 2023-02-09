import { create } from 'zustand';
import { initialWeekSchedule } from './data';
import { DaySchedule, MonthSchedule, WeekSchedule } from './models';

interface Store {
  weekSchedule: WeekSchedule;
  setWeekSchedule: (value: {
    daySchedule: DaySchedule;
    weekDay: number;
  }) => void;
  monthSchedule: MonthSchedule[];
  setMonthSchedule: (schedule: MonthSchedule[]) => void;
  monthScheduleWithLimit: MonthSchedule[];
  setMonthScheduleWithLimit: (schedule: MonthSchedule[]) => void;
  employee: string;
  setEmployee: (employee: string) => void;
  month: number;
  setMonth: (month: number) => void;
  year: number;
  setYear: (year: number) => void;
}

export const useStore = create<Store>((set) => ({
  employee: '',
  setEmployee: (employee) =>
    set((state) => ({
      ...state,
      employee: employee,
    })),
  month: new Date().getMonth() + 1,
  setMonth: (month) =>
    set((state) => ({
      ...state,
      month,
    })),
  year: new Date().getFullYear(),
  setYear: (year) =>
    set((state) => ({
      ...state,
      year,
    })),
  weekSchedule: initialWeekSchedule,
  setWeekSchedule: (weekSchedule) =>
    set((state) => ({
      ...state,
      weekSchedule,
    })),
  monthSchedule: [],
  setMonthSchedule: (monthSchedule) =>
    set((state) => ({
      ...state,
      monthSchedule,
    })),
  monthScheduleWithLimit: [],
  setMonthScheduleWithLimit: (monthScheduleWithLimit) =>
    set((state) => ({
      ...state,
      monthScheduleWithLimit,
    })),
}));
