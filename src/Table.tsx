import { useEffect } from 'react';

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
} from './dateHelpers';
import { DayScheduleConst } from './models';
import { SCHEDULE_LEGEND } from './data';
import useStore from './store';

const MONTH_HOURS_LIMIT = 160;
let totalHours: number = 0;

export const Table = () => {
  const { month, year, schedule } = useStore();
  const numberOfDaysInMonth = new Date(year, month, 0).getDate();
  const monthDays = Array.from(
    Array(numberOfDaysInMonth).keys(),
    (_, i) => i + 1
  );
  const { data, status, error } = useQuery(['freeDays', year], () =>
    fetchFreeDays(year)
  );

  useEffect(() => {
    totalHours = 0;
  }, [month]);

  const handleRenderValue = (
    day: number,
    info: keyof typeof DayScheduleConst
  ) => {
    const holodays = data?.map(({ date }) => formatDate(new Date(date)));

    switch (info) {
      case DayScheduleConst.duration: {
        if (totalHours < MONTH_HOURS_LIMIT) {
          const duration = (day: number) =>
            +schedule[new Date(year, month - 1, day).getDay()]?.duration?.split(
              'h'
            )[0] || 0;

          totalHours += duration(day);
        }

        return getHours(
          new Date(year, month - 1, day),
          schedule,
          holodays,
          totalHours < MONTH_HOURS_LIMIT
        );
      }
      case DayScheduleConst.start: {
        return getStartHour(
          new Date(year, month - 1, day),
          schedule,
          holodays,
          totalHours < MONTH_HOURS_LIMIT
        );
      }
      case DayScheduleConst.end: {
        return getEndHour(
          new Date(year, month - 1, day),
          schedule,
          holodays,
          totalHours < MONTH_HOURS_LIMIT
        );
      }

      default:
        return '';
    }
  };

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
              <span>{totalHours}h</span>
            </div>
          </Th>
          {monthDays.map((day) => (
            <Th key={day}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{weekDay(new Date(year, month - 1, day))}</span>
                <span>
                  {day}/{monthName(new Date(year, month - 1, day))}
                </span>
              </div>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Inceput</Td>
          {monthDays.map((day) => (
            <Td key={day}>{handleRenderValue(day, DayScheduleConst.start)}</Td>
          ))}
        </Tr>
        <Tr>
          <Td>Sfarsit</Td>
          {monthDays.map((day) => (
            <Td key={day}>{handleRenderValue(day, DayScheduleConst.end)}</Td>
          ))}
        </Tr>
        <Tr>
          <Td>Ore</Td>
          {monthDays.map((day) => (
            <Td key={day}>
              {handleRenderValue(day, DayScheduleConst.duration)}
            </Td>
          ))}
        </Tr>
      </Tbody>
    </ChackraTable>
  );
};
