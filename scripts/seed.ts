/**
 * One-time migration: uploads the local seedIssues array into Firestore.
 *
 * Usage:
 *   1. Fill in .env.local with your Firebase web config
 *   2. Run: npm run seed
 *
 * Safe to re-run: duplicates will be skipped by title+ward match.
 */
import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { seedIssues } from '../data/issues';

// Manually load .env.local (Next.js only autoloads it in next dev/build)
try {
  const env = readFileSync('.env.local', 'utf8');
  for (const line of env.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1).replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  console.error('⚠️  Could not read .env.local — aborting.');
  process.exit(1);
}

const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!cfg.projectId) {
  console.error('❌  NEXT_PUBLIC_FIREBASE_PROJECT_ID missing in .env.local');
  process.exit(1);
}

const app = initializeApp(cfg);
const db = getFirestore(app);
const COLLECTION = 'issues';

async function run() {
  console.log(`🌱  Seeding ${seedIssues.length} issues into "${COLLECTION}"...`);
  let added = 0;
  let skipped = 0;

  for (const issue of seedIssues) {
    const dup = await getDocs(
      query(
        collection(db, COLLECTION),
        where('title', '==', issue.title),
        where('ward', '==', issue.ward)
      )
    );
    if (!dup.empty) {
      skipped++;
      continue;
    }

    await addDoc(collection(db, COLLECTION), {
      title: issue.title,
      description: issue.description,
      ward: issue.ward,
      status: issue.status,
      createdAt: Timestamp.fromDate(new Date(issue.createdAt)),
    });
    added++;
    process.stdout.write('.');
  }

  console.log(`\n✅  Done. Added: ${added}, Skipped (already existed): ${skipped}`);
  process.exit(0);
}

run().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});
