import {
  Table as ChackraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
  isHoloday,
} from './dateHelpers';
import { useScheduleContext } from './useScheduleContext';

export const Table = () => {
  const { month, year, schedule } = useScheduleContext();
  const numberOfDaysInMonth = new Date(year, month, 0).getDate();
  const monthDays = Array.from(
    Array(numberOfDaysInMonth).keys(),
    (_, i) => i + 1
  );
  const { data, status, error } = useQuery(['freeDays', year], () =>
    fetchFreeDays(year)
  );

  const holodays = data?.map(({ date }) => formatDate(new Date(date)));

  const totalHours = () => {
    const duration = (day: number) =>
      +schedule[new Date(year, month - 1, day).getDay()]?.duration?.split(
        'h'
      )[0] || 0;

    const total = monthDays
      .filter((day) => !isHoloday(new Date(year, month - 1, day), holodays))
      .reduce((acc, day) => duration(day) + acc, 0);

    return `${total}h`;
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <ChackraTable variant='striped'>
      <Thead>
        <Tr>
          <Th>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>Total</span>
              <span>{totalHours()}</span>
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
            <Td key={day}>
              {getStartHour(new Date(year, month - 1, day), schedule, holodays)}
            </Td>
          ))}
        </Tr>
        <Tr>
          <Td>Sfarsit</Td>
          {monthDays.map((day) => (
            <Td key={day}>
              {getEndHour(new Date(year, month - 1, day), schedule, holodays)}
            </Td>
          ))}
        </Tr>
        <Tr>
          <Td>Ore</Td>
          {monthDays.map((day) => (
            <Td key={day}>
              {getHours(new Date(year, month - 1, day), schedule, holodays)}
            </Td>
          ))}
        </Tr>
      </Tbody>
    </ChackraTable>
  );
};
