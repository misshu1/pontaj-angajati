import type { AppOptions } from 'firebase-admin/app';
import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (getApps().length === 0) {
  if (!process.env.PRIVATE_FIREBASE_KEY) {
    throw new Error(`Missing 'PRIVATE_FIREBASE_KEY' in .env file.`);
  }

  const firebaseConfig: AppOptions = {
    credential: cert({
      projectId: process.env.PRIVATE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.PRIVATE_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_FIREBASE_KEY?.replace(/\\n/g, '\n'),
    }),
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  };

  initializeApp(firebaseConfig);
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
