import { Heading, Stack } from '@chakra-ui/react';
import { forwardRef, ComponentPropsWithoutRef } from 'react';
import useStore from './store';
import { Table } from './Table';

interface ComponentToPrintProps {}
export const ComponentToPrint = forwardRef<
  HTMLDivElement,
  ComponentToPrintProps
>((props, ref) => {
  const { employee } = useStore();

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
