import { create } from 'zustand';
import { initialSchedule } from './data';
import { DaySchedule, WeekSchedule } from './models';

interface Store {
  schedule: WeekSchedule;
  setSchedule: (value: { daySchedule: DaySchedule; weekDay: number }) => void;
  employee: string;
  setEmployee: (employee: string) => void;
  month: number;
  setMonth: (month: number) => void;
  year: number;
  setYear: (year: number) => void;
}

const useStore = create<Store>((set) => ({
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
  schedule: initialSchedule,
  setSchedule: () =>
    set((state) => ({
      ...state,
    })),
}));

export default useStore;
