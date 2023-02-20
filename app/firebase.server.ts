import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (getApps().length === 0) {
  if (!process.env.FIREBASE_APPLICATION_CREDENTIALS) {
    throw new Error(`Missing 'FIREBASE_APPLICATION_CREDENTIALS' in .env file.`);
  }

  initializeApp({
    credential: cert(require(process.env.FIREBASE_APPLICATION_CREDENTIALS)),
  });
}

const auth = getAuth(getApp());
const db = getFirestore(getApp());

async function getSessionToken(idToken: string) {
  const decodedToken = await auth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error('Recent sign in required');
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000;

  return auth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}

export { auth, db, getSessionToken };
