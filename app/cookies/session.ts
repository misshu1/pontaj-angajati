import { createCookieSessionStorage } from '@remix-run/node';
import { fetchFreeDays } from '~/requests';
import { formatDate } from '~/utils';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set!');
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      sameSite: 'lax',
      secrets: [sessionSecret],
      secure: process.env.NODE_ENV === 'production',
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
