import { WeekSchedule } from './models';

export const SCHEDULE_LEGEND = [
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

export const initialSchedule: WeekSchedule = {
  0: {
    duration: '12h',
    start: '07:00',
    end: '19:00',
  },
  1: {
    duration: '',
    start: '',
    end: '',
  },
  2: {
    duration: '',
    start: '',
    end: '',
  },
  3: {
    duration: '5h',
    start: '17:00',
    end: '22:00',
  },
  4: {
    duration: '5h',
    start: '17:00',
    end: '22:00',
  },
  5: {
    duration: '5h',
    start: '17:00',
    end: '22:00',
  },
  6: {
    duration: '13h',
    start: '07:00',
    end: '19:00',
  },
};
