import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { auth, getSessionToken } from '~/firebase.server';

const sessionSecret = process.env.SESSION_SECRET_AUTH;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET_AUTH must be set!');
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: '__auth__session',
      secure: process.env.NODE_ENV === 'production',
      secrets: [sessionSecret],
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 14, // two weeks
      httpOnly: true,
    },
  });

export async function createAuthSession(idToken: string, redirectTo: string) {
  const token = await getSessionToken(idToken);
  const session = await getSession();
  session.set('token', token);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function getAuthSession(request: Request) {
  const cookieSession = await getSession(request.headers.get('Cookie'));
  const token = cookieSession.get('token');
  if (!token) return null;

  try {
    const tokenUser = await auth.verifySessionCookie(token, true);
    return tokenUser;
  } catch (error) {
    return null;
  }
}

export async function destroyAuthSession(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const newCookie = await destroySession(session);

  return redirect('/login', { headers: { 'Set-Cookie': newCookie } });
}
