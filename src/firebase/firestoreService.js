import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from './config';

// Base getter for user collection
const getCommitmentsRef = (uid) => collection(db, 'users', uid, 'commitments');

export const fetchCommitments = async (uid) => {
  const q = query(getCommitmentsRef(uid), orderBy('deadline', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addCommitment = async (uid, commitmentData) => {
  const docRef = await addDoc(getCommitmentsRef(uid), {
    ...commitmentData,
    createdAt: new Date().toISOString()
  });
  return { id: docRef.id, ...commitmentData };
};

export const updateCommitment = async (uid, commitmentId, updates) => {
  const docRef = doc(db, 'users', uid, 'commitments', commitmentId);
  await updateDoc(docRef, updates);
  return { id: commitmentId, ...updates };
};

export const deleteCommitment = async (uid, commitmentId) => {
  const docRef = doc(db, 'users', uid, 'commitments', commitmentId);
  await deleteDoc(docRef);
  return commitmentId;
};
