import { useMemo } from 'react';
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
import { MonthSchedule } from './models';
import { SCHEDULE_LEGEND } from './data';
import { useStore } from './store';

const MONTH_HOURS_LIMIT = 160;

export const Table = () => {
  const { month, year, weekSchedule } = useStore();
  const numberOfDaysInMonth = new Date(year, month, 0).getDate();
  const monthDays = Array.from(
    Array(numberOfDaysInMonth).keys(),
    (_, i) => i + 1
  );

  const { data, status, error } = useQuery(['freeDays', year], () =>
    fetchFreeDays(year)
  );

  const holodays = data?.map(({ date }) => formatDate(new Date(date)));

  const monthSchedule = useMemo(() => {
    if (data) {
      let totalHours = 0;

      return monthDays.reduce((acc: MonthSchedule[], day: number, index) => {
        const date = new Date(year, month - 1, day);

        totalHours +=
          (acc[index]?.duration ?? 0) + getHours(date, weekSchedule, holodays);

        return [
          ...acc,
          {
            day: day,
            weekDayName: weekDay(date),
            monthName: monthName(date),
            duration: getHours(date, weekSchedule, holodays),
            start: getStartHour(date, weekSchedule, holodays),
            end: getEndHour(date, weekSchedule, holodays),
            isWeekend: isWeekend(date),
            totalHours: totalHours,
          },
        ];
      }, []);
    }

    return [];
  }, [data, monthDays, year, month]);

  const monthScheduleWithLimit = useMemo(() => {
    return monthSchedule.map((item) => {
      if (
        item.totalHours < MONTH_HOURS_LIMIT &&
        item.duration + item.totalHours > MONTH_HOURS_LIMIT
      ) {
        const duration = MONTH_HOURS_LIMIT - item.totalHours;

        return {
          ...item,
          totalHours: item.totalHours + duration,
          end: `${+item.start.split(':')[0] + duration}:00`,
          duration,
        };
      }

      if (item.totalHours <= MONTH_HOURS_LIMIT) {
        return item;
      }

      return {
        ...item,
        totalHours: MONTH_HOURS_LIMIT,
        start: '',
        end: '',
        duration: 0,
      };
    });
  }, [monthSchedule]);

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
              <span>{monthScheduleWithLimit.at(-1)?.totalHours}h</span>
            </div>
          </Th>
          {monthScheduleWithLimit.map(
            ({ day, weekDayName, monthName, duration }) => (
              <Th key={day} className={!duration ? 'empty' : ''}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{weekDayName}</span>
                  <span>
                    {day}/{monthName}
                  </span>
                </div>
              </Th>
            )
          )}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Inceput</Td>
          {monthScheduleWithLimit.map(({ day, start }) => (
            <Td key={day} className={!start ? 'empty' : ''}>
              {start}
            </Td>
          ))}
        </Tr>
        <Tr>
          <Td>Sfarsit</Td>
          {monthScheduleWithLimit.map(({ day, end }) => (
            <Td key={day} className={!end ? 'empty' : ''}>
              {end}
            </Td>
          ))}
        </Tr>
        <Tr>
          <Td>Ore</Td>
          {monthScheduleWithLimit.map(({ day, duration }) => (
            <Td key={day} className={!duration ? 'empty' : ''}>
              {duration === 0 ? '' : duration}
            </Td>
          ))}
        </Tr>
      </Tbody>
    </ChackraTable>
  );
};
