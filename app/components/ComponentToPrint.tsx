import { Typography } from '@material-tailwind/react';
import { forwardRef } from 'react';
import { Table } from './Table';
import { useRootData } from '~/hooks';

interface ComponentToPrintProps {}
export const ComponentToPrint = forwardRef<
  HTMLDivElement,
  ComponentToPrintProps
>((props, ref) => {
  const data = useRootData();

  return (
    <div ref={ref} className='overflow-auto'>
      <Typography variant='h3' className='capitalize'>
        {data?.employee}
      </Typography>
      <Table />
    </div>
  );
});

ComponentToPrint.displayName = 'ComponentToPrint';
