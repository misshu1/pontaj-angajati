import type {
  ScheduleEventType,
  ScheduleLegendType,
  WeekSchedule,
} from '~/models';

export const scheduleLegend: ScheduleLegendType[] = [
  {
    id: 'A',
    name: 'Accident De Munca',
  },
  {
    id: 'B',
    name: 'Concediu Medical',
  },
  {
    id: 'C',
    name: 'Concediu De Odihna',
  },
  {
    id: 'D',
    name: 'Delegatie',
  },
  {
    id: 'F',
    name: 'Concediu Fara Plata',
  },
  {
    id: 'I',
    name: 'Invoire',
  },
  {
    id: 'J',
    name: 'Somaj Tehnic',
  },
  {
    id: 'L',
    name: 'Zi Libera',
  },
  {
    id: 'M',
    name: 'Maternitate',
  },
  {
    id: 'N',
    name: 'Absenta Nemotivata',
  },
  {
    id: 'O',
    name: 'Obligatii cetatenesti',
  },
  {
    id: 'P',
    name: 'Formare Profesionala',
  },
  {
    id: 'R',
    name: 'Concediu Crestere Copil',
  },
  {
    id: 'S',
    name: 'Suspendare Contract',
  },
];

export const scheduledEvents: ScheduleEventType[] = [
  //   {
  //     day: 3,
  //     month: 2,
  //     year: 2023,
  //     eventType: 'B',
  //   },
  //   {
  //     day: 4,
  //     month: 2,
  //     year: 2023,
  //     eventType: 'B',
  //   },
  //   {
  //     day: 5,
  //     month: 2,
  //     year: 2023,
  //     eventType: 'B',
  //   },
  //   {
  //     day: 19,
  //     month: 2,
  //     year: 2023,
  //     eventType: 'L',
  //   },
  //   {
  //     day: 20,
  //     month: 2,
  //     year: 2023,
  //     eventType: 'L',
  //   },
  //   {
  //     day: 21,
  //     month: 2,
  //     year: 2023,
  //     eventType: 'L',
  //   },
  //   {
  //     day: 22,
  //     month: 2,
  //     year: 2023,
  //     eventType: 'L',
  //   },
];

export const initialWeekSchedule: WeekSchedule = {
  0: {
    duration: 14,
    start: '07:00',
    end: '21:00',
  },
  1: {
    duration: 0,
    start: '',
    end: '',
  },
  2: {
    duration: 0,
    start: '',
    end: '',
  },
  3: {
    duration: 4,
    start: '18:00',
    end: '22:00',
  },
  4: {
    duration: 4,
    start: '18:00',
    end: '22:00',
  },
  5: {
    duration: 4,
    start: '18:00',
    end: '22:00',
  },
  6: {
    duration: 14,
    start: '07:00',
    end: '21:00',
  },
};
