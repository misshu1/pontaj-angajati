import { forwardRef } from 'react';
import { Heading, Stack } from '@chakra-ui/react';
import { useStore } from './store';
import { Table } from './Table';

interface ComponentToPrintProps {}
export const ComponentToPrint = forwardRef<
  HTMLDivElement,
  ComponentToPrintProps
>((props, ref) => {
  const { employee } = useStore();

  return (
    <Stack ref={ref} overflow='auto'>
      <Heading as='h3' size='lg' textTransform='capitalize'>
        {employee}
      </Heading>
      <Table />
    </Stack>
  );
});
