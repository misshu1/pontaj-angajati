import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import { Table } from './Table';
import { useScheduleContext } from './useScheduleContext';

export const ComponentToPrint = forwardRef<
  any,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { employee } = useScheduleContext();

  return (
    <div ref={ref}>
      <h2>{employee}</h2>
      <Table />
    </div>
  );
});
