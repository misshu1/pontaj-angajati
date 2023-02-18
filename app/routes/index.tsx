import { json, redirect } from '@remix-run/node';
import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint, HeaderDates } from '~/components';
import { scheduleLegend, initialWeekSchedule, scheduledEvents } from '~/data';
import type { RootData } from '~/models';
import { fetchFreeDays } from '~/requests';
import { formatDate, generateSchedule } from '~/utils';
import { commitSession, getSession } from '~/session';

export async function loader({ request }: LoaderArgs) {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let employee = '';
  let legalFreeDays: string[] = [];
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('year')) {
    year = await session.get('year');
  }

  if (session.has('month')) {
    month = await session.get('month');
  }

  if (session.has('employee')) {
    employee = await session.get('employee');
  }

  if (
    !session.has('legalFreeDays') ||
    (session.has('year') &&
      session.has('previousYear') &&
      session.get('year') !== session.get('previousYear'))
  ) {
    // Only fetch 'freeDays' when year changed
    // Else use the saved data from cookie
    const freeDaysData = await fetchFreeDays(year);
    legalFreeDays = freeDaysData.map(({ date }) => formatDate(new Date(date)));
    session.set('legalFreeDays', legalFreeDays);
  } else {
    legalFreeDays = session.get('legalFreeDays');
  }

  const monthSchedule = generateSchedule({
    legalFreeDays,
    weekSchedule: initialWeekSchedule,
    scheduledEvents,
    monthHoursLimit: 160,
    month,
    year,
  });

  const data: RootData = {
    legalFreeDays,
    weekSchedule: initialWeekSchedule,
    monthSchedule,
    scheduledEvents,
    scheduleLegend,
    employee,
    month,
    year,
  };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { name, value } = Object.fromEntries(formData);
  const session = await getSession(request.headers.get('Cookie'));

  if (name === 'month' && typeof value === 'string') {
    session.set('month', +value);
  }

  session.set('previousYear', session.get('year') ?? null);
  if (name === 'year' && typeof value === 'string') {
    session.set('year', +value);
  }

  if (name === 'employee' && typeof value === 'string') {
    session.set('employee', value);
  }

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function Index() {
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
  }, [handlePrint]);

  return (
    <>
      <div style={{ display: 'flex', gap: '15px', overflow: 'auto' }}>
        <HeaderDates handlePrint={handlePrint} />
      </div>
      <ComponentToPrint ref={componentRef} />
    </>
  );
}
