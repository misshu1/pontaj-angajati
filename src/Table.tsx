import { useMemo, useCallback } from 'react';
import {
  Table as ChackraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Stack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchFreeDays } from './requests';
import {
  getHours,
  formatDate,
  monthName,
  weekDay,
  getStartHour,
  getEndHour,
  isWeekend,
} from './dateHelpers';
import { MonthSchedule, ScheduleLegendId } from './models';
import { SCHEDULE_LEGEND, scheduledEvents } from './data';
import { useStore } from './store';

const MONTH_HOURS_LIMIT = 160;

export const Table = () => {
  const { month, year, weekSchedule, setHolidays, holidays } = useStore();
  const numberOfDaysInMonth = new Date(year, month, 0).getDate();
  const monthDays = Array.from(
    Array(numberOfDaysInMonth).keys(),
    (_, i) => i + 1
  );

  const { data, status, error } = useQuery(
    ['freeDays', year],
    () => fetchFreeDays(year),
    {
      onSuccess: (data) => {
        setHolidays(data.map(({ date }) => formatDate(new Date(date))));
      },
    }
  );

  const renderValue = useCallback(
    (eventType: ScheduleLegendId | null, value: number | string) => {
      if (eventType !== null) {
        return eventType;
      }

      if (typeof value === 'number' && value === 0) {
        return '';
      }

      return value;
    },
    []
  );

  const monthSchedule = useMemo(() => {
    if (data) {
      let totalHours = 0;
      let firstDayOerLimit = false;

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

        const duration = isEvent ? 0 : getHours(date, weekSchedule, holidays);

        const previousTotalHours = totalHours;
        totalHours += duration;

        const overlimitDuration = MONTH_HOURS_LIMIT - totalHours;
        const durationRemaining =
          duration + overlimitDuration > 0 ? duration + overlimitDuration : 0;

        if (MONTH_HOURS_LIMIT - previousTotalHours < duration) {
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
                : getStartHour(date, weekSchedule, holidays),
            end:
              durationRemaining === 0
                ? ''
                : getEndHour(date, weekSchedule, holidays),
            isWeekend: isWeekend(date),
            totalHours: firstDayOerLimit
              ? totalHours - totalHours + MONTH_HOURS_LIMIT
              : totalHours,
            eventType: isEvent && eventType ? eventType : null,
          },
        ];
      }, []);
    }

    return [];
  }, [data, monthDays, year, month]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <ChackraTable variant='striped'>
      <TableCaption textAlign='left'>
        <Text
          fontSize='sm'
          color='#000'
          as='span'
          margin='0 !important'
          fontWeight={900}
        >
          Legenda
        </Text>
        <Stack
          display='grid'
          gridTemplateColumns='repeat(3, 200px)'
          gridAutoFlow='column'
          gridTemplateRows='repeat(5, 20px)'
          className='legend-items'
        >
          {SCHEDULE_LEGEND.map((item) => (
            <Text
              key={item.id}
              fontSize='sm'
              color='#909090'
              as='span'
              margin='0 !important'
            >
              <Text
                textTransform='uppercase'
                fontWeight={900}
                color='#000'
                as='span'
              >
                {item.id}
              </Text>{' '}
              - {item.name}
            </Text>
          ))}
        </Stack>
      </TableCaption>
      <Thead>
        <Tr>
          <Th>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>Total</span>
              <span>{monthSchedule.at(-1)?.totalHours}h</span>
            </div>
          </Th>
          {monthSchedule.map(({ day, weekDayName, monthName, duration }) => (
            <Th key={day} className={!duration ? 'empty' : ''}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{weekDayName}</span>
                <span>
                  {day}/{monthName}
                </span>
              </div>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Inceput</Td>
          {monthSchedule.map(({ day, start, duration, eventType }) => (
            <Td
              key={day}
              className={!duration ? 'empty' : ''}
              fontWeight={eventType ? 900 : 400}
            >
              {renderValue(eventType, start)}
            </Td>
          ))}
        </Tr>
        <Tr>
          <Td>Sfarsit</Td>
          {monthSchedule.map(({ day, end, duration, eventType }) => (
            <Td
              key={day}
              className={!duration ? 'empty' : ''}
              fontWeight={eventType ? 900 : 400}
            >
              {renderValue(eventType, end)}
            </Td>
          ))}
        </Tr>
        <Tr>
          <Td>Ore</Td>
          {monthSchedule.map(({ day, duration, eventType }) => (
            <Td
              key={day}
              className={!duration ? 'empty' : ''}
              fontWeight={eventType ? 900 : 400}
            >
              {renderValue(eventType, duration)}
            </Td>
          ))}
        </Tr>
      </Tbody>
    </ChackraTable>
  );
};
