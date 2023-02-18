import { createCookieSessionStorage } from '@remix-run/node';
import { fetchFreeDays } from '~/requests';
import { formatDate } from '~/utils';

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 34560000, // 400 days
      path: '/',
      sameSite: 'lax',
      secrets: ['s3cret1 stuffing'],
      secure: true,
    },
  });

const getLegalFreeDays = async (request: Request) => {
  const session = await getSession(request.headers.get('Cookie'));
  let year = new Date().getFullYear();
  let legalFreeDays: string[] = [];

  if (session.has('year')) {
    year = await session.get('year');
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

  return legalFreeDays;
};

export { getSession, commitSession, destroySession, getLegalFreeDays };
