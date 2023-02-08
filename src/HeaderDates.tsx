import { Button, Input, Select, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AddSchedule } from './AddSchedule';
import { monthsListNames, monthsListValue, yearsList } from './dateHelpers';
import { useStore } from './store';
import { useDebounce } from './useDebounce';

export const HeaderDates = () => {
  const { setEmployee, setMonth, setYear, month, year } = useStore();
  const [name, setName] = useState('');
  const debouncedName = useDebounce(name, 100);

  useEffect(() => {
    setEmployee(debouncedName);
  }, [debouncedName]);

  return (
    <Stack
      spacing={3}
      display='grid'
      gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))'
      gap='15px'
      flex='1'
      padding='15px'
    >
      <Input
        placeholder='Nume Angajat'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        size='lg'
        marginTop='12px'
        minWidth='200px'
      />
      <Select
        size='lg'
        name='month'
        onChange={(e) => setMonth(+e.target.value)}
        value={month}
        minWidth='200px'
      >
        {monthsListValue.map((monthNumber, index) => (
          <option value={monthNumber} key={monthNumber}>
            {monthsListNames[index]}
          </option>
        ))}
      </Select>
      <Select
        size='lg'
        name='year'
        onChange={(e) => setYear(+e.target.value)}
        value={year}
        minWidth='200px'
      >
        {yearsList.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </Select>
      <AddSchedule>
        <Button
          colorScheme='green'
          size='lg'
          margin='27px 15px 0 0'
          width='100%'
          minWidth='200px'
        >
          Adauga Program
        </Button>
      </AddSchedule>
    </Stack>
  );
};
