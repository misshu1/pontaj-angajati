import { useEffect, useState } from 'react';

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
import { DayScheduleConst, MonthSchedule } from './models';
import { SCHEDULE_LEGEND } from './data';
import useStore from './store';

const MONTH_HOURS_LIMIT = 160;

export const Table = () => {
  const { month, year, weekSchedule, setMonthSchedule, monthSchedule } =
    useStore();
  const numberOfDaysInMonth = new Date(year, month, 0).getDate();
  const monthDays = Array.from(
    Array(numberOfDaysInMonth).keys(),
    (_, i) => i + 1
  );

  const { data, status, error } = useQuery(['freeDays', year], () =>
    fetchFreeDays(year)
  );

  const holodays = data?.map(({ date }) => formatDate(new Date(date)));

  useEffect(() => {
    if (data) {
      let totalHours = 0;

      const monthScheduleData = monthDays.reduce(
        (acc: MonthSchedule[], day: number, index) => {
          totalHours +=
            (acc[index]?.duration ?? 0) +
            getHours(new Date(year, month - 1, day), weekSchedule, holodays);

          return [
            ...acc,
            {
              day: day,
              weekDayName: weekDay(new Date(year, month - 1, day)),
              monthName: monthName(new Date(year, month - 1, day)),
              duration: getHours(
                new Date(year, month - 1, day),
                weekSchedule,
                holodays
              ),
              start: getStartHour(
                new Date(year, month - 1, day),
                weekSchedule,
                holodays
              ),
              end: getEndHour(
                new Date(year, month - 1, day),
                weekSchedule,
                holodays
              ),
              isWeekend: isWeekend(new Date(year, month - 1, day)),
              totalHours: totalHours,
            },
          ];
        },
        []
      );
      setMonthSchedule(monthScheduleData);
    }
  }, [data, month, year]);

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
          gridTemplateRows='repeat(4, 20px)'
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
          {monthSchedule.map(({ day, weekDayName, monthName }) => (
            <Th key={day}>
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
          {monthSchedule.map(({ day, start }) => (
            <Td key={day}>{start}</Td>
          ))}
        </Tr>
        <Tr>
          <Td>Sfarsit</Td>
          {monthSchedule.map(({ day, end }) => (
            <Td key={day}>{end}</Td>
          ))}
        </Tr>
        <Tr>
          <Td>Ore</Td>
          {monthSchedule.map(({ day, duration }) => (
            <Td key={day}>{duration === 0 ? '' : duration}</Td>
          ))}
        </Tr>
      </Tbody>
    </ChackraTable>
  );
};
