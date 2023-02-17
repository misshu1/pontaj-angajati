import type { MonthSchedule, ScheduleEventType, WeekSchedule } from '~/models';
import { getStartHour } from '~/utils';
import {
  getEndHour,
  getHours,
  isWeekend,
  monthName,
  weekDay,
} from './dateHelpers';

interface GenerateScheduleProps {
  legalFreeDays: string[];
  monthHoursLimit: number;
  scheduledEvents: ScheduleEventType[];
  weekSchedule: WeekSchedule;
  year: number;
  month: number;
}

export const generateSchedule = ({
  legalFreeDays,
  monthHoursLimit,
  scheduledEvents,
  weekSchedule,
  year,
  month,
}: GenerateScheduleProps) => {
  if (legalFreeDays) {
    let totalHours = 0;
    let firstDayOerLimit = false;

    const numberOfDaysInMonth = new Date(year, month, 0).getDate();
    const monthDays = Array.from(
      Array(numberOfDaysInMonth).keys(),
      (_, i) => i + 1
    );

    return monthDays.reduce((acc: MonthSchedule[], day: number) => {
      const date = new Date(year, month - 1, day);

      const isEvent = scheduledEvents.some(
        (scheduledEvent) =>
          year === scheduledEvent.year &&
          month === scheduledEvent.month &&
          day === scheduledEvent.day
      );

      const eventType = scheduledEvents.find(
        (scheduledEvent) =>
          year === scheduledEvent.year &&
          month === scheduledEvent.month &&
          day === scheduledEvent.day
      )?.eventType;

      const duration = isEvent
        ? 0
        : getHours(date, weekSchedule, legalFreeDays);

      const previousTotalHours = totalHours;
      totalHours += duration;

      const overlimitDuration = monthHoursLimit - totalHours;
      const durationRemaining =
        duration + overlimitDuration > 0 ? duration + overlimitDuration : 0;

      if (monthHoursLimit - previousTotalHours < duration) {
        firstDayOerLimit = true;
      }

      return [
        ...acc,
        {
          day: day,
          weekDayName: weekDay(date),
          monthName: monthName(date),
          duration: firstDayOerLimit ? durationRemaining : duration,
          start:
            durationRemaining === 0
              ? ''
              : getStartHour(date, weekSchedule, legalFreeDays),
          end:
            durationRemaining === 0
              ? ''
              : getEndHour(date, weekSchedule, legalFreeDays),
          isWeekend: isWeekend(date),
          totalHours: firstDayOerLimit
            ? totalHours - totalHours + monthHoursLimit
            : totalHours,
          eventType: isEvent && eventType ? eventType : null,
        },
      ];
    }, []);
  }

  return [];
};
