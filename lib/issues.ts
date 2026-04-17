import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export type IssueStatus = 'विचाराधीन' | 'प्रगति हुँदैछ' | 'समाधान भएको';

export interface Issue {
  id: string;
  title: string;
  description: string;
  ward: number;
  status: IssueStatus;
  createdAt: string;
  name?: string;
  phone?: string;
}

export interface NewIssueInput {
  title: string;
  description: string;
  ward: number;
  status?: IssueStatus;
  name?: string;
  phone?: string;
}

const COLLECTION = 'issues';

function toIsoDate(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString().slice(0, 10);
  if (typeof value === 'string') return value;
  return new Date().toISOString().slice(0, 10);
}

interface FirestoreDoc {
  id: string;
  data: () => Record<string, unknown>;
}

function normalize(snapshot: FirestoreDoc): Issue {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    ward: Number(data.ward ?? 0),
    status: (data.status as IssueStatus) ?? 'विचाराधीन',
    createdAt: toIsoDate(data.createdAt),
    name: data.name as string | undefined,
    phone: data.phone as string | undefined,
  };
}

export async function getIssues(): Promise<Issue[]> {
  const snap = await getDocs(
    query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  );
  return snap.docs.map(normalize);
}

export async function getIssuesByWard(ward: number): Promise<Issue[]> {
  const snap = await getDocs(
    query(
      collection(db, COLLECTION),
      where('ward', '==', ward),
      orderBy('createdAt', 'desc')
    )
  );
  return snap.docs.map(normalize);
}

export async function getIssueById(id: string): Promise<Issue | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return normalize(snap);
}

export async function addIssue(input: NewIssueInput): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    title: input.title,
    description: input.description,
    ward: input.ward,
    status: input.status ?? 'विचाराधीन',
    name: input.name ?? null,
    phone: input.phone ?? null,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateIssueStatus(id: string, status: IssueStatus) {
  await updateDoc(doc(db, COLLECTION, id), { status });
}

export async function deleteIssue(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}
