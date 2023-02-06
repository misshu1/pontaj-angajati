import { Heading, Stack } from '@chakra-ui/react';
import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { Table } from './Table';
import { useScheduleContext } from './useScheduleContext';

export const ComponentToPrint = forwardRef<
  any,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { employee } = useScheduleContext();

  return (
    <Stack
      ref={ref}
      overflow='auto'
      sx={{
        '@media screen': {
          margin: '15px',
        },
      }}
    >
      <Heading as='h3' size='lg' textTransform='capitalize'>
        {employee}
      </Heading>
      <Table />
    </Stack>
  );
});
