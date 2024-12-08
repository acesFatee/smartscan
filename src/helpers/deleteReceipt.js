import { db } from "@/config/firebase";

export const deleteReceipt = async (documentPath) => {
  try {
    await db.doc(documentPath).delete();
  } catch (error) {
    throw new Error("Error deleting receipt from firestore");
  }
};
