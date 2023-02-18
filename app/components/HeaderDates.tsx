import { Link, useFetcher } from '@remix-run/react';
import { Button, Input, Select, Stack } from '@chakra-ui/react';
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

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetcher.submit(
      { value: e.target.value, name: e.target.name },
      { method: 'post', action: '/?index' }
    );
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetcher.submit(
      { value: e.target.value, name: e.target.name },
      { method: 'post', action: '/?index' }
    );
  };

  return (
    <Stack
      spacing={3}
      display='grid'
      gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))'
      gap='15px'
      flex='1'
      padding='15px'
      width='100%'
      maxWidth='80rem'
    >
      <Input
        placeholder='Nume Angajat'
        type='text'
        value={name}
        onChange={handleEmployeeChange}
        size='lg'
        marginTop='12px'
        minWidth='200px'
      />
      <Select
        size='lg'
        name='month'
        onChange={handleMonthChange}
        value={data?.month}
        minWidth='200px'
        textTransform='capitalize'
        isDisabled={
          fetcher.state === 'submitting' || fetcher.state === 'loading'
        }
      >
        {monthsListValue.map((monthNumber, index) => (
          <option value={monthNumber} key={monthNumber}>
            {new Date(new Date().getFullYear(), index, 1).toLocaleString(
              'ro-RO',
              { month: 'long' }
            )}
          </option>
        ))}
      </Select>
      <Select
        size='lg'
        name='year'
        onChange={handleYearChange}
        value={data?.year}
        minWidth='200px'
        isDisabled={
          fetcher.state === 'submitting' || fetcher.state === 'loading'
        }
      >
        {yearsList.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </Select>
      <Link to='/add-schedule'>
        <Button
          colorScheme='green'
          size='lg'
          width='100%'
          minWidth='200px'
          type='button'
        >
          Adauga Program
        </Button>
      </Link>

      <Button
        colorScheme='yellow'
        size='lg'
        margin='27px 15px 0 auto'
        onClick={handlePrint}
        minWidth='85px'
        type='button'
      >
        Print
      </Button>
    </Stack>
  );
};
