import { Link, useFetcher } from '@remix-run/react';
import { Input, Select, Option, Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { monthsListValue, yearsList } from '~/utils';
import { useDebounce, useRootData } from '~/hooks';

interface HeaderDatesProps {
  handlePrint: () => void;
}
export const HeaderDates: FC<HeaderDatesProps> = ({ handlePrint }) => {
  const data = useRootData();
  const [name, setName] = useState(data?.employee ?? '');
  const fetcher = useFetcher();
  const debouncedName = useDebounce(name, 300);

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    fetcher.submit(
      { value: debouncedName, name: 'employee' },
      { method: 'post', action: '/?index' }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);

  const handleMonthChange = (value?: string) => {
    if (!value) return;

    fetcher.submit(
      { value: value, name: 'month' },
      { method: 'post', action: '/?index' }
    );
  };

  const handleYearChange = (value?: string) => {
    if (!value) return;

    fetcher.submit(
      { value: value, name: 'year' },
      { method: 'post', action: '/?index' }
    );
  };

  return (
    <div className='w-full min-w-[80rem] p-4 gap-4 flex-1 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]'>
      <Input
        variant='outlined'
        size='md'
        label='Nume Angajat'
        type='text'
        value={name}
        onChange={handleEmployeeChange}
        className='min-w-[200px]'
      />
      <Select
        variant='outlined'
        label='Month'
        name='month'
        onChange={handleMonthChange}
        value={data?.month.toString()}
        className='min-w-[200px] capitalize'
        disabled={fetcher.state === 'submitting' || fetcher.state === 'loading'}
      >
        {monthsListValue.map((monthNumber, index) => (
          <Option
            value={monthNumber.toString()}
            key={monthNumber}
            className='capitalize'
          >
            {new Date(new Date().getFullYear(), index, 1).toLocaleString(
              'ro-RO',
              { month: 'long' }
            )}
          </Option>
        ))}
      </Select>
      <Select
        name='year'
        variant='outlined'
        label='Year'
        onChange={handleYearChange}
        value={data?.year.toString()}
        className='min-w-[200px]'
        disabled={fetcher.state === 'submitting' || fetcher.state === 'loading'}
      >
        {yearsList.map((year) => (
          <Option value={year.toString()} key={year}>
            {year}
          </Option>
        ))}
      </Select>
      <Link to='/add-schedule'>
        <Button color='green' className='w-full min-w-[200px]' type='button'>
          Adauga Program
        </Button>
      </Link>

      <Button
        color='amber'
        onClick={handlePrint}
        className='margin-[27px_15px_0_auto] min-w-[85px]'
        type='button'
      >
        Print
      </Button>
    </div>
  );
};
