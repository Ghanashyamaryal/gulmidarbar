import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missing.length > 0) {
  const msg = `🔥 Firebase config is missing: ${missing.join(', ')}. ` +
    `Set NEXT_PUBLIC_FIREBASE_* env vars (locally in .env.local, and in Vercel → Settings → Environment Variables, then redeploy).`;
  if (typeof window !== 'undefined') console.error(msg);
  throw new Error(msg);
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
