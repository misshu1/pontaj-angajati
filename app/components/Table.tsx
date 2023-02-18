import { useCallback } from 'react';
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
import type { ScheduleLegendId } from '~/models';
import { EmptyTable } from '~/components';
import { useRootData } from '~/hooks';

export const Table = () => {
  const data = useRootData();

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

  if (!data) return <EmptyTable />;

  return (
    <ChackraTable variant='striped' size='md'>
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
          {data?.scheduleLegend.map((item) => (
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
              <span>{data.monthSchedule.at(-1)?.totalHours}h</span>
            </div>
          </Th>
          {data.monthSchedule.map(
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
          {data.monthSchedule.map(({ day, start, duration, eventType }) => (
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
          {data.monthSchedule.map(({ day, end, duration, eventType }) => (
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
          {data.monthSchedule.map(({ day, duration, eventType }) => (
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
