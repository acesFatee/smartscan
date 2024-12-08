import { db } from "@/config/firebase";

export const getReceipt = async (id) => {
  try {
    const docRef = db.collection("receipts").doc(id);
    const receipt = await docRef.get();

    if (!receipt.exists) {
      return null;
    }

    return receipt.data();
  } catch (error) {
    throw new Error(error);
  }
};
