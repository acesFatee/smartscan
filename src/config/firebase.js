import admin from 'firebase-admin';

import serviceAccount from './service-account.json';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET,
    });
}

// Get a reference to Firestore
const db = admin.firestore();

// Get a reference to Firebase Storage
const storage = admin?.storage()?.bucket();

export { db, storage };
