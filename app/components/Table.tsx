import { useCallback } from 'react';
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
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-gray-900'>
        <thead className='text-xs uppercase bg-gray-50'>
          <tr>
            <th scope='col'>
              <div className='flex flex-col'>
                <span>Total</span>
                <span>{data.monthSchedule.at(-1)?.totalHours}h</span>
              </div>
            </th>
            {data.monthSchedule.map(
              ({ day, weekDayName, monthName, duration }) => (
                <th key={day} className={!duration ? 'empty' : ''}>
                  <div className='flex flex-col'>
                    <span>{weekDayName}</span>
                    <span>
                      {day}/{monthName}
                    </span>
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          <tr className='bg-blue-gray-50'>
            <th className='font-medium whitespace-nowrap'>Inceput</th>
            {data.monthSchedule.map(({ day, start, duration, eventType }) => (
              <td
                key={day}
                className={`${!duration ? 'empty' : ''} ${
                  eventType ? 'font-black' : 'font-normal'
                }`}
              >
                {renderValue(eventType, start)}
              </td>
            ))}
          </tr>
          <tr className='bg-white'>
            <th className='font-medium whitespace-nowrap'>Sfarsit</th>
            {data.monthSchedule.map(({ day, end, duration, eventType }) => (
              <td
                key={day}
                className={`${!duration ? 'empty' : ''} ${
                  eventType ? 'font-black' : 'font-normal'
                }`}
              >
                {renderValue(eventType, end)}
              </td>
            ))}
          </tr>
          <tr className='bg-blue-gray-50'>
            <th className='font-medium whitespace-nowrap'>Ore</th>
            {data.monthSchedule.map(({ day, duration, eventType }) => (
              <td
                key={day}
                className={`${!duration ? 'empty' : ''} ${
                  eventType ? 'font-black' : 'font-normal'
                }`}
              >
                {renderValue(eventType, duration)}
              </td>
            ))}
          </tr>
        </tbody>
        <caption
          className='text-left caption-side-bottom mt-4'
          style={{ captionSide: 'bottom' }}
        >
          <span className='text-sm text-black font-black'>Legenda</span>
          <div className='grid grid-cols-[repeat(3,_200px)] grid-flow-col grid-rows-[repeat(5,_20px)] print:grid-rows-[repeat(5,_10pt)_!important]'>
            {data?.scheduleLegend.map((item) => (
              <span key={item.id} className='text-sm text-gray-600'>
                <span className='text-black font-black uppercase'>
                  {item.id}
                </span>{' '}
                - {item.name}
              </span>
            ))}
          </div>
        </caption>
      </table>
    </div>
  );
};
