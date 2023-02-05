import { createContext, useContext, useState, ReactNode } from 'react';

interface DaySchedule {
  start: string;
  end: string;
  duration: string;
}

export interface WeekSchedule {
  [key: number]: DaySchedule;
}

interface ScleduleContextType {
  schedule: WeekSchedule;
  employee: string;
  month: number;
  year: number;
  updateEnployee: (value: string) => void;
  updateMonth: (value: number) => void;
  updateYear: (value: number) => void;
  updateSchedule: (value: {
    daySchedule: DaySchedule;
    weekDay: number;
  }) => void;
}

const defaultScheduleContext = {
  schedule: {},
  employee: '',
  updateEnployee: () => {},
  updateYear: () => {},
  updateMonth: () => {},
  updateSchedule: () => {},
  month: 1,
  year: new Date().getFullYear(),
};

const initialSchedule: WeekSchedule = {
  0: {
    duration: '15h',
    start: '07:00',
    end: '22:00',
  },
  1: {
    duration: '2h',
    start: '06:00',
    end: '08:00',
  },
  2: {
    duration: '2h',
    start: '06:00',
    end: '08:00',
  },
  3: {
    duration: '2h',
    start: '06:00',
    end: '08:00',
  },
  4: {
    duration: '2h',
    start: '06:00',
    end: '08:00',
  },
  5: {
    duration: '2h',
    start: '06:00',
    end: '08:00',
  },
  6: {
    duration: '15h',
    start: '07:00',
    end: '22:00',
  },
};

const ScleduleContext = createContext<ScleduleContextType>(
  defaultScheduleContext
);
export const FolderPagesProvider = ({ children }: { children: ReactNode }) => {
  const [schedule, setSchedule] = useState<WeekSchedule>(initialSchedule);
  const [employee, setEmployee] = useState<string>('');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const updateSchedule = ({
    daySchedule,
    weekDay,
  }: {
    daySchedule: DaySchedule;
    weekDay: number;
  }) => {
    const newSchedule: WeekSchedule = {};
    newSchedule[weekDay] = daySchedule;

    setSchedule((prevState) => ({
      ...prevState,
      ...newSchedule,
    }));
  };

  const updateEnployee = (value: string) => {
    setEmployee(value);
  };

  const updateMonth = (value: number) => {
    setMonth(value);
  };

  const updateYear = (value: number) => {
    setYear(value);
  };

  return (
    <ScleduleContext.Provider
      value={{
        schedule,
        employee,
        month,
        year,
        updateEnployee,
        updateMonth,
        updateYear,
        updateSchedule,
      }}
    >
      {children}
    </ScleduleContext.Provider>
  );
};

export const useScheduleContext = () => {
  return useContext(ScleduleContext);
};
