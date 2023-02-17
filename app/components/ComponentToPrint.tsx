import { forwardRef } from 'react';
import { Heading, Stack } from '@chakra-ui/react';
import { Table } from './Table';
import { useRootData } from '~/hooks';

interface ComponentToPrintProps {}
export const ComponentToPrint = forwardRef<
  HTMLDivElement,
  ComponentToPrintProps
>((props, ref) => {
  const data = useRootData();

  return (
    <Stack ref={ref} overflow='auto'>
      <Heading as='h3' size='lg' textTransform='capitalize'>
        {data?.employee}
      </Heading>
      <Table />
    </Stack>
  );
});

ComponentToPrint.displayName = 'ComponentToPrint';
