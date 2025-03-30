import admin from "firebase-admin";
import path from "path";

if (!admin.apps.length) {
  let serviceAccount;

  if (process.env.ENV === "DEV") {
    // ✅ Local development: use service-account.json
    serviceAccount = require(path.resolve(__dirname, "./service-account.json"));
  } else {
    // ✅ Production (e.g. Vercel): use base64 from env
    serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET,
  });
}

const db = admin.firestore();
const storage = admin.storage().bucket();

export { db, storage };
