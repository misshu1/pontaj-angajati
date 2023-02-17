import { Button } from '@chakra-ui/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint, HeaderDates } from '~/components';
import { scheduleLegend, initialWeekSchedule, scheduledEvents } from '~/data';
import type { RootData } from '~/models';
import { fetchFreeDays } from '~/requests';
import { formatDate, generateSchedule } from '~/utils';

export async function loader({ params, context, request }: LoaderArgs) {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const freeDaysData = await fetchFreeDays(year);
  const legalFreeDays = freeDaysData.map(({ date }) =>
    formatDate(new Date(date))
  );

  const monthSchedule = generateSchedule({
    legalFreeDays,
    month,
    monthHoursLimit: 160,
    scheduledEvents,
    weekSchedule: initialWeekSchedule,
    year,
  });

  const data: RootData = {
    scheduleLegend,
    scheduledEvents,
    legalFreeDays,
    employee: '',
    month: new Date().getMonth() + 1,
    year,
    weekSchedule: initialWeekSchedule,
    monthSchedule,
  };

  return json(data);
}

export default function Index() {
  //   const data = useLoaderData<typeof loader>();
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current || null,
  });

  useEffect(() => {
    const printEvent = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener('keydown', (e) => printEvent(e));

    return () => {
      window.removeEventListener('keydown', printEvent);
    };
  }, []);

  return (
    <>
      <div style={{ display: 'flex', gap: '15px', overflow: 'auto' }}>
        <HeaderDates handlePrint={handlePrint} />
        <Button onClick={handlePrint} colorScheme='yellow'>
          print
        </Button>
      </div>
      <ComponentToPrint ref={componentRef} />
    </>
  );
}
