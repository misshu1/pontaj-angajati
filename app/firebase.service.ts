import type { FirebaseOptions } from 'firebase/app';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { destroyAuthSession } from './cookies/authSession';
import { getPublicEnv } from './ui/PublicEnv';

const firebaseConfig: FirebaseOptions = {
  apiKey: getPublicEnv('FIREBASE_API_KEY'),
  authDomain: getPublicEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getPublicEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getPublicEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getPublicEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getPublicEnv('FIREBASE_APP_ID'),
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const clientAuth = getAuth(getApp());
const clientDB = getFirestore(getApp());

// Let Remix handle the persistence via session cookies.
setPersistence(clientAuth, inMemoryPersistence);

async function register(email: string, password: string) {
  return createUserWithEmailAndPassword(clientAuth, email, password);
}

async function login(email: string, password: string) {
  return signInWithEmailAndPassword(clientAuth, email, password);
}

async function logout(request: Request) {
  await signOut(clientAuth);
  return await destroyAuthSession(request);
}

export { clientDB, register, login, logout };
