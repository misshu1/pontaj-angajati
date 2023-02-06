import { Button, Input, Select, Stack } from '@chakra-ui/react';
import { AddSchedule } from './AddSchedule';
import { monthsListNames, monthsListValue, yearsList } from './dateHelpers';
import { useScheduleContext } from './useScheduleContext';

export const HeaderDates = () => {
  const { employee, updateEnployee, updateMonth, updateYear, month, year } =
    useScheduleContext();

  return (
    <Stack
      spacing={3}
      display='grid'
      gridTemplateColumns='repeat(4, 1fr)'
      gap='15px'
      padding='15px'
    >
      <Input
        placeholder='Nume Angajat'
        type='text'
        value={employee}
        onChange={(e) => updateEnployee(e.target.value)}
        size='lg'
        marginTop='12px'
      />
      <Select
        size='lg'
        name='month'
        onChange={(e) => updateMonth(+e.target.value)}
        value={month}
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
        onChange={(e) => updateYear(+e.target.value)}
        value={year}
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
        >
          Adauga Program
        </Button>
      </AddSchedule>
    </Stack>
  );
};
