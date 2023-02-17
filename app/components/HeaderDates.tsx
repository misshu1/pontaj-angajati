import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Button, Input, Select, Stack } from '@chakra-ui/react';
import { monthsListValue, yearsList } from '~/utils';
// import { useStore } from './store';
import { useDebounce } from '~/hooks';
import { useMatches } from '@remix-run/react';

interface HeaderDatesProps {
  handlePrint: () => void;
}

export const HeaderDates: FC<HeaderDatesProps> = ({ handlePrint }) => {
  //   const test = useMatches();
  //   console.log(test);
  //   const { setEmployee, setMonth, setYear, month, year } = useStore();
  const [name, setName] = useState('');
  const debouncedName = useDebounce(name, 100);

  useEffect(() => {
    // setEmployee(debouncedName);
  }, [debouncedName]);

  //   const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setMonth(+e.target.value);
  //   };

  //   const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setYear(+e.target.value);
  //   };

  return <div>something</div>;

  //   return (
  //     <Stack
  //       spacing={3}
  //       display='grid'
  //       gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))'
  //       gap='15px'
  //       flex='1'
  //       padding='15px'
  //       width='100%'
  //       maxWidth='80rem'
  //     >
  //       <Input
  //         placeholder='Nume Angajat'
  //         type='text'
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //         size='lg'
  //         marginTop='12px'
  //         minWidth='200px'
  //       />
  //       <Select
  //         size='lg'
  //         name='month'
  //         onChange={handleMonthChange}
  //         value={month}
  //         minWidth='200px'
  //         textTransform='capitalize'
  //       >
  //         {monthsListValue.map((monthNumber, index) => (
  //           <option value={monthNumber} key={monthNumber}>
  //             {new Date(new Date().getFullYear(), index, 1).toLocaleString(
  //               'ro-RO',
  //               { month: 'long' }
  //             )}
  //           </option>
  //         ))}
  //       </Select>
  //       <Select
  //         size='lg'
  //         name='year'
  //         onChange={handleYearChange}
  //         value={year}
  //         minWidth='200px'
  //       >
  //         {yearsList.map((year) => (
  //           <option value={year} key={year}>
  //             {year}
  //           </option>
  //         ))}
  //       </Select>
  //       <Button
  //         colorScheme='green'
  //         size='lg'
  //         margin='27px 15px 0 0'
  //         width='100%'
  //         minWidth='200px'
  //       >
  //         Adauga Program
  //       </Button>
  //       <Button
  //         colorScheme='yellow'
  //         size='lg'
  //         margin='27px 15px 0 auto'
  //         onClick={handlePrint}
  //         minWidth='85px'
  //       >
  //         Print
  //       </Button>
  //     </Stack>
  //   );
};
