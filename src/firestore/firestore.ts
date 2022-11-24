// @ts-nocheck
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../mavelli-ssi-firebase-adminsdk-tysp4-d80f9020c2.json';

initializeApp({
  credential: cert(serviceAccount),
  databaseURL:
    'https://mavelli-ssi-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const db = getFirestore();

export const StrategyCollection = db.collection('strategies');
