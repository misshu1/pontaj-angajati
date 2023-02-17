import { createCookieSessionStorage } from '@remix-run/node';

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

export { getSession, commitSession, destroySession };
