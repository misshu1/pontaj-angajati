import { useState } from 'react';
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

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {monthDays.map((day) => (
            <th key={day}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{weekDay(new Date(year, month - 1, day))}</span>
                <span>
                  {day}/{monthName(new Date(year, month - 1, day))}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Inceput</td>
          {monthDays.map((day) => (
            <td key={day}>
              {getStartHour(new Date(year, month - 1, day), schedule, holodays)}
            </td>
          ))}
        </tr>
        <tr>
          <td>Sfarsit</td>
          {monthDays.map((day) => (
            <td key={day}>
              {getEndHour(new Date(year, month - 1, day), schedule, holodays)}
            </td>
          ))}
        </tr>
        <tr>
          <td>Ore</td>
          {monthDays.map((day) => (
            <td key={day}>
              {getHours(new Date(year, month - 1, day), schedule, holodays)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
